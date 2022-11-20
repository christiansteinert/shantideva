package de.christiansteinert.dailyversesplugin;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import de.christiansteinert.dailyversesplugin.util.AlarmUtil;

/**
 * Receives an event after the device has booted and schedules a timer for showing the next verse
 * of the day.
 */
public final class BootupReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(final Context context, final Intent intent) {
        AlarmUtil.setNextAlarm(context);
    }
}
