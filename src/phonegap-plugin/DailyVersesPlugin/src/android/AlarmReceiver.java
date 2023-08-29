package de.christiansteinert.dailyversesplugin;

import static de.christiansteinert.dailyversesplugin.util.ThreadUtil.runInMainUiThread;

import java.util.Date;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import de.christian_steinert.shantideva_verses.MainActivity;
import de.christian_steinert.shantideva_verses.R;
import de.christiansteinert.dailyversesplugin.util.AlarmUtil;

import android.util.Log;
import android.os.Build;
import android.text.TextUtils;

/**
 * Receives a timer event and shows the verse of the day as Android notification message.
 */
public final class AlarmReceiver extends BroadcastReceiver {

    private static final int NOTIFICATION_TYPE_VERSE_OF_THE_DAY = 1;

    @Override
    public void onReceive(final Context context, final Intent intent) {
        final String[] verse = VerseAccess.getVerseOfTheDay(context);
        final String verseText = TextUtils.join("\n", verse);

        new ConfigController(context).saveLastMessageTime(new Date());

        Log.i(this.getClass().getName(), "=> showing notification");

        runInMainUiThread(() -> {
            showNotification(context, verseText);
            scheduleNextNotification(context);
        });
    }

    private void scheduleNextNotification(final Context context) {
        AlarmUtil.setNextAlarm(context);
    }

    private void showNotification(final Context context, final String verseText) {        
        final ConfigController configController = new ConfigController(context);
        
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        configController.createVerseOfTheDayNotificationChannel();

        // create the actual notifiation
        final String verseOfTheDayTxt = configController.getVerseOfTheDayTxt();
        final int flags = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
            ? PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_IMMUTABLE
            : PendingIntent.FLAG_ONE_SHOT;
        final PendingIntent contentIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class), flags);
        final NotificationCompat.Builder notification = (new NotificationCompat.Builder(context, ConfigController.NOTIFICATION_CHANNEL_ID))
                .setContentTitle(verseOfTheDayTxt + ":")
                .setContentText(verseText)
                .setPriority(Notification.PRIORITY_LOW)
                .setSilent(true)
                .setAutoCancel(true)
                .setContentIntent(contentIntent)
                .setBadgeIconType(NotificationCompat.BADGE_ICON_SMALL)
                .setSmallIcon(R.drawable.ic_notify)
                .setColor(0xffff6600)
                .setStyle(new NotificationCompat.BigTextStyle()
                    .setBigContentTitle(verseOfTheDayTxt + ":")
                    .bigText(verseText)
                );

        NotificationManagerCompat nm = NotificationManagerCompat.from(context);
        nm.notify(NOTIFICATION_TYPE_VERSE_OF_THE_DAY, notification.build());
    }
}
