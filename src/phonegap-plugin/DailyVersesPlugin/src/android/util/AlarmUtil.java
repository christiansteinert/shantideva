package de.christiansteinert.dailyversesplugin.util;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PermissionHelper;
import org.json.JSONException;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import androidx.annotation.Nullable;
import androidx.core.app.AlarmManagerCompat;
import androidx.core.content.ContextCompat;
import de.christiansteinert.dailyversesplugin.AlarmReceiver;
import de.christiansteinert.dailyversesplugin.ConfigController;
import de.christiansteinert.dailyversesplugin.DailyVersesPlugin;

public final class AlarmUtil {
    private static final String PERMISSION_POST_NOTIFICATIONS = "android.permission.POST_NOTIFICATIONS";

    /**
     * Set the timer for the next message of the day. The timer will trigger the
     * class {@link AlarmReceiver}
     *
     * @param context    context object
     * @param wakeupTime the time when the message should be triggered or null to stop a previously set alarm
     */
    public static void setAlarm(final Context context,
                                final @Nullable Date wakeupTime,
                                final Class receiver) {

        Log.i(DailyVersesPlugin.class.getName(), "setAlarm  called: date = " + wakeupTime);
        final AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        final int flags = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
                ? PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_IMMUTABLE
                : PendingIntent.FLAG_ONE_SHOT;
        final Intent alarmIntent = new Intent(context, receiver).setAction("testAPP");
        final PendingIntent pendingIntent = PendingIntent
                .getBroadcast(context, 0, alarmIntent, flags);
        if (wakeupTime == null) {
            manager.cancel(pendingIntent);
        } else {
            if (Build.VERSION.SDK_INT >= 31) {
                // Android 12+: Exact alarm is not allowed anymore
                AlarmManagerCompat.setAndAllowWhileIdle(manager,
                        AlarmManager.RTC_WAKEUP,
                        wakeupTime.getTime(),
                        pendingIntent);
            } else {
                // older versions: do exact alarm time because this helps with aggressive 
                // energy saving modes, such as on Samsung devices 
                AlarmManagerCompat.setExactAndAllowWhileIdle(manager,
                        AlarmManager.RTC_WAKEUP,
                        wakeupTime.getTime(),
                        pendingIntent);

            }
        }
    }

    /**
     * get the time when the next message of the day is due
     *
     * @return the date when the next message should be triggered or null if notifications are
     * disabled
     * @throws JSONException if required settings are missing
     */
    @Nullable
    public static Date getTimeForNextMessage(final Context context) {
        final ConfigController config = new ConfigController(context);
        Log.i(DailyVersesPlugin.class.getName(),
                "getTimeForNextMessage: enabled = " + config.isNotificationEnabled());
        if (config.isNotificationEnabled()) {
            final Calendar now = new GregorianCalendar();

            final Calendar alarmTime = new GregorianCalendar();
            alarmTime.set(Calendar.HOUR_OF_DAY, config.getNotificationHour());
            alarmTime.set(Calendar.MINUTE, config.getNotificationMinute());
            alarmTime.set(Calendar.SECOND, 0);
            Log.i(DailyVersesPlugin.class.getName(),
                    "getTimeForNextMessage: hour = " + config.getNotificationHour());
            Log.i(DailyVersesPlugin.class.getName(),
                    "getTimeForNextMessage: minute = " + config.getLastMessageTime());

            Date lastMsgDate = config.getLastMessageTime();
            if (lastMsgDate == null) {
                // If no message was ever generated so far then pretend that the first
                //message was sent just now. In this way messages will start being
                //generated tomorrow
                lastMsgDate = new Date();
                config.saveLastMessageTime(lastMsgDate);
            }
            final Calendar lastMsg = new GregorianCalendar();
            lastMsg.setTime(lastMsgDate);

            if (lastMsg.get(Calendar.YEAR) == alarmTime.get(Calendar.YEAR)
                    && lastMsg.get(Calendar.MONTH) == alarmTime.get(Calendar.MONTH)
                    && lastMsg.get(Calendar.DAY_OF_MONTH) == alarmTime
                    .get(Calendar.DAY_OF_MONTH)) {
                // Alarm was already triggered today.
                // Trigger the next message tomorrow.
                alarmTime.add(Calendar.DATE, 1);

            } else if (now.compareTo(alarmTime) > 0) {
                // the time for the alarm has already passed
                // trigger the alarm two minutes from now
                alarmTime.setTime(now.getTime());
                alarmTime.add(Calendar.MINUTE, 2);
            }
            Log.i(DailyVersesPlugin.class.getName(),
                    "getTimeForNextMessage: alarmTime = " + alarmTime);
            return alarmTime.getTime();
        } else {
            return null;
        }
    }

    public static boolean isAllowed(final Context context, final String... permissions) {
        boolean result = true;
        for(final String permission: permissions) {
            final int permissionState = ContextCompat.checkSelfPermission(context, permission);
            result &= (permissionState == PackageManager.PERMISSION_GRANTED);
        }
        return result;
    }

    public static void requestNotificationPermission(
            final CordovaPlugin plugin,
            final Context context) {

        final Date msgTime = getTimeForNextMessage(context);
        if (msgTime != null && Build.VERSION.SDK_INT >= 33) {
            final boolean permissionsGranted = isAllowed(context, PERMISSION_POST_NOTIFICATIONS);
            
            if (!permissionsGranted) {
                // request permission to show notification
                PermissionHelper.requestPermission(plugin, 1, PERMISSION_POST_NOTIFICATIONS);
            }
        }
    }

    /**
     * set the time when we want to be woken up by the OS for the next message of the day
     */
    public static void setNextAlarm(final Context context) {
        final Date msgTime = getTimeForNextMessage(context);
        Log.i(DailyVersesPlugin.class.getName(), "setAlarm: " + msgTime);
        setAlarm(context, msgTime, AlarmReceiver.class);
    }
}
