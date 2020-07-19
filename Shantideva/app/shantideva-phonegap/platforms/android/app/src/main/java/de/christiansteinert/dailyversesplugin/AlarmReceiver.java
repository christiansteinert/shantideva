package de.christiansteinert.dailyversesplugin;

import static de.christiansteinert.dailyversesplugin.ThreadUtil.runInMainThread;


import de.christiansteinert.dailyversesplugin.*;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Date;
import java.util.Locale;
import java.util.GregorianCalendar;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.os.Build;
import android.text.TextUtils;

/**
 * This class receives a timer event and handles it.
 */
public class AlarmReceiver extends BroadcastReceiver {

	int NOTIFICATION_TYPE_VERSE_OF_THE_DAY = 1;
    static final String NOTIFICATION_CHANNEL_ID = "verseOfTheDay";

	@Override
	public void onReceive(Context context, Intent intent) {
		String[] verse = ConfigUtil.readVerseOfTheDay(context, DailyVersesPlugin.getPreferences(context));
		final String verseText = TextUtils.join("\n", verse);
		final Context ctx = context;
		Calendar now;

		try{
			now = Calendar.getInstance();
		} catch(Exception e) {
			now = new GregorianCalendar();;
		}

		SharedPreferences prefs = context.getSharedPreferences(
				DailyVersesPlugin.class.getName(), Context.MODE_PRIVATE);

		ConfigUtil.saveLastMessageTime(prefs, new Date());

		StringBuilder date = new StringBuilder();
		date.append(now.get(Calendar.YEAR));
		date.append('-');
		date.append(now.get(Calendar.MONTH));
		date.append('-');
		date.append(now.get(Calendar.DATE));

		Log.i(this.getClass().getName(), "=> showing notification");
		
        // show the notification; do so in the UI thread
        runInMainThread(new Runnable() {
            @Override
            public void run() {
                showNotification(ctx, verseText);
            }
        });
	}

	private void showNotification(Context context, String verseText) {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        JSONObject settings = ConfigUtil.readSettings(context, DailyVersesPlugin.getPreferences(context));
        String verseOfTheDayTxt;
        
        try {
          verseOfTheDayTxt = settings.getString(ConfigUtil.CFG_VERSE_OF_THE_DAY_TXT);
        } catch (JSONException e) {
          verseOfTheDayTxt = ConfigUtil.VERSE_OF_THE_DAY_TXT_DEFAULT;
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, verseOfTheDayTxt, NotificationManager.IMPORTANCE_LOW);
            
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = (NotificationManager) context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }                

        NotificationCompat.BigTextStyle style = new NotificationCompat.BigTextStyle().setBigContentTitle(verseOfTheDayTxt + ":").bigText(verseText);
		NotificationCompat.Builder builder = (new NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID))
            .setContentTitle(verseOfTheDayTxt + ":")
            .setContentText(verseText)
            .setPriority(Notification.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(PendingIntent.getActivity(context, 0, new Intent(context, de.christian_steinert.shantideva_verses.MainActivity.class), PendingIntent.FLAG_ONE_SHOT))
            .setBadgeIconType(NotificationCompat.BADGE_ICON_NONE)
            //.setSmallIcon(de.christian_steinert.shantideva_verses.R.mipmap.ic_launcher)
            .setSmallIcon(de.christian_steinert.shantideva_verses.R.drawable.ic_notify)
            .setColor(0xffff6600)
            .setStyle(style);
          
        Notification notification = builder.build();
		//Notification notification = new NotificationCompat.BigTextStyle(builder)
		//		.setBigContentTitle(verseOfTheDayTxt + ":").bigText(verseText).build();

		NotificationManager nm = (NotificationManager) context
				.getSystemService(Context.NOTIFICATION_SERVICE);
		nm.notify(NOTIFICATION_TYPE_VERSE_OF_THE_DAY, notification);

		DailyVersesPlugin.setAlarm(context); // set next alarm

	}
}
