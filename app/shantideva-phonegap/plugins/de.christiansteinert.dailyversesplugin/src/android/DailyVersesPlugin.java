package de.christiansteinert.dailyversesplugin;

import org.apache.cordova.*;

import de.christiansteinert.dailyversesplugin.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.os.Build;
import android.content.res.Configuration; 
import android.graphics.Color;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

/**
 * This class is the main helper class for Android code and is directly called by Javascript
 */
public class DailyVersesPlugin extends CordovaPlugin {
	public Activity getActivity() {
		return this.cordova.getActivity();
	}

	public static SharedPreferences getPreferences(Context context) {
		return context.getSharedPreferences(DailyVersesPlugin.class.getName(),
				Context.MODE_PRIVATE);
	}

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
			
		if (Build.VERSION.SDK_INT >= 29) {
		    // force the nav bar to black if Android is in night mode; this is necessary on some Samsung devices which 
		    // keep a white navigation bar even when the device in night mode
            ThreadUtil.runInMainThread(new Runnable() {
                @Override
                public void run() {
                    int currentNightMode = cordova.getActivity().getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
                    if(currentNightMode == Configuration.UI_MODE_NIGHT_YES) {
                        Window window = cordova.getActivity().getWindow();
                        window.clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);

                        int uiOptions = window.getDecorView().getSystemUiVisibility();                
                        uiOptions = uiOptions | WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS;
                        uiOptions = uiOptions & ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                        window.getDecorView().setSystemUiVisibility(uiOptions);
                        
                        window.setNavigationBarColor(Color.BLACK);                                
                    }
                }
			});
        }
        
		/**
		 * The saveConfig action expects only a single object as parameter. This
		 * object must have the following structure:0x00000010  
		 * 
		 * <pre>
		 * { messageEnabled:<boolean, messageHour:<int>, messageMinute:<int>, uiLanguage:<string>, textLanguage:<string>, textLanguage2:<string>  }
		 * </pre>
		 * 
		 * for example:
		 * 
		 * <pre>
		 * { messageEnabled:true, messageHour:10, messageMinute:0, uiLanguage:'en', textLanguage:'en', textLanguage2:'' }
		 * </pre>
		 */
		if ("saveConfig".equals(action)) {
			JSONObject settings = args.getJSONObject(0);
            Log.i(DailyVersesPlugin.class.getName(),"saveConfig: " + settings);
			ConfigUtil.saveSettings(getPreferences(getActivity()), settings);
			setAlarm(getActivity());
			callbackContext.success();
			return true;

		} else if ("setAlarm".equals(action)) {
			setAlarm(getActivity());
			callbackContext.success();
			return true;
			
		} else if ("loadConfig".equals(action)) {
			/**
			 * the loadConfig action expects no parameters. It will return a JSON
			 * object with the same structure as loadConfig expects as input
			 * parameter.
			 */
			JSONObject settings = ConfigUtil
					.readSettings(getActivity(), getPreferences(getActivity()));
			callbackContext.success(settings);
			return true;

		} else if ("getNextMessageTime".equals(action)) {
			/**
			 * this action expects no parameters. It will return a JSON object that
			 * contains the date and time for the next message that will be generated.
			 */
			Date nextMsgDate = getTimeForNextMessage(getActivity());
			Calendar date = Calendar.getInstance();
			date.setTime(nextMsgDate);

			JSONObject result = new JSONObject();
			result.put("year", date.get(Calendar.YEAR));
			result.put("month", date.get(Calendar.MONTH));
			result.put("day", date.get(Calendar.DAY_OF_MONTH));
			result.put("hour", date.get(Calendar.HOUR_OF_DAY));
			result.put("minute", date.get(Calendar.MINUTE));

			callbackContext.success(result);
			return true;

		} else if ("ping".equals(action)) {
			/**
			 * this action requires no arguments. It will return a test message
			 * seconds later and should trigger a message
			 */
			JSONObject result = new JSONObject();
			result.put("response", "ping received");

			callbackContext.success(result);
			return true;


		} else if ("testTimer".equals(action)) {
			/**
			 * this action requires no arguments. It will set a timer that fires 10
			 * seconds later and should trigger a message
			 */
			Calendar msgTime = Calendar.getInstance();
			msgTime.add(Calendar.SECOND, 10);
			setAlarm(getActivity(), msgTime.getTime());
			callbackContext.success(new JSONObject());
			return true;

		} else if ("testNotification".equals(action)) {
			/**
			 * this action requires no arguments. It will generate a notification
			 * right away
			 */
			final Intent showMsgIntent = new Intent();
			showMsgIntent.setAction(AlarmReceiver.class.getName());
			// final CordovaInterface cordova = this.cordova;

			ThreadUtil.runInMainThread(new Runnable() {
				@Override
				public void run() {
					Log.i(this.getClass().getName(),
							"=> running cordova.startActivityForResult in order to trigger an intent");
					// getActivity().startActivity(showMsgIntent);
					getActivity().sendBroadcast(showMsgIntent);
					// cordova.startActivityForResult(ShantidevaJavaAssistent.this,
					// showMsgIntent, 0);
					Log.i(this.getClass().getName(),
							"<= done running cordova.startActivityForResult in order to trigger an intent");
				}
			});

			callbackContext.success(new JSONObject());
			return true;
		} else {
			// unknown action
			return false; // Returning false results in a "MethodNotFound" error.
		}
	}

	/**
	 * Set the timer for the next message of the day. The timer will trigger the
	 * class {@link AlarmReceiver}
	 * 
	 * @param context
	 *          context object
	 * @param date
	 *          the time when the message should be triggered
	 */
	public static void setAlarm(Context context, Date date) {
	    Log.i(DailyVersesPlugin.class.getName(),"setAlarm  called: date = " + date );
        AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Intent alarmIntent = new Intent(context, AlarmReceiver.class);
        
        alarmIntent.setAction("testAPP");
        //PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 123451, alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
		PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, alarmIntent, PendingIntent.FLAG_UPDATE_CURRENT);        
        //manager.cancel(pendingIntent);

        if (date == null) {
			manager.cancel(pendingIntent);
			return;
		}
        
        long alarmPeriodicTime =  date.getTime(); //System.currentTimeMillis() + Utils.getTimeInMilliSec(Constant.TimeType.MINUTE, minutes);
        if (Build.VERSION.SDK_INT >= 23) {
            manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, alarmPeriodicTime, pendingIntent);
        } else if (Build.VERSION.SDK_INT >= 19) {
            manager.setExact(AlarmManager.RTC_WAKEUP, alarmPeriodicTime, pendingIntent);
        } else {
            manager.set(AlarmManager.RTC_WAKEUP, alarmPeriodicTime, pendingIntent);
        }
	/*
		AlarmManager alarmManager = (AlarmManager) context
				.getSystemService(Context.ALARM_SERVICE);
		Intent intent = new Intent();
		intent.setAction(AlarmReceiver.class.getName());
		PendingIntent operation = PendingIntent.getBroadcast(context, 0, intent,
				PendingIntent.FLAG_UPDATE_CURRENT);
		if (date == null) {
			alarmManager.cancel(operation);
		} else {
			alarmManager.set(AlarmManager.RTC, date.getTime(), operation);
		}
    */
		
		
	}

	/**
	 * get the time when the next message of the day is due
	 * 
	 * @return the date when the next message should be triggered
	 * @throws JSONException
	 */
	public static Date getTimeForNextMessage(Context context)
			throws JSONException {
		JSONObject settings = ConfigUtil.readSettings(context,getPreferences(context));
		boolean enabled = settings.getBoolean(ConfigUtil.CFG_MSG_ENABLED);
		Log.i(DailyVersesPlugin.class.getName(),"getTimeForNextMessage: enabled = " + enabled);
		if (enabled) {
			int hour = settings.getInt(ConfigUtil.CFG_MSG_HOUR);
			int minute = settings.getInt(ConfigUtil.CFG_MSG_MINUTE);
            Log.i(DailyVersesPlugin.class.getName(),"getTimeForNextMessage: hour = " + hour);
            Log.i(DailyVersesPlugin.class.getName(),"getTimeForNextMessage: minute = " + minute);

			Calendar now = Calendar.getInstance();

			Calendar alarmTime = Calendar.getInstance(TimeZone.getDefault());
			alarmTime.set(Calendar.HOUR_OF_DAY, hour);
			alarmTime.set(Calendar.MINUTE, minute);
			alarmTime.set(Calendar.SECOND, 50);
			
			//alarmTime.set(now.get(Calendar.YEAR), now.get(Calendar.MONTH),
			//		now.get(Calendar.DATE), hour, minute, 0);

			Date lastMsgDate = ConfigUtil.readLastMessageTime(getPreferences(context));
			if (lastMsgDate == null) {
				/*
				 * If no message was ever generated so far then pretend that the first
				 * message was sent just now. In this way messages will start being
				 * generated tomorrow
				 */
				lastMsgDate = new Date();
				ConfigUtil.saveLastMessageTime(getPreferences(context), lastMsgDate);
			}
			Calendar lastMsg = Calendar.getInstance();
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

            Log.i(DailyVersesPlugin.class.getName(),"getTimeForNextMessage: alarmTime = " + alarmTime);
			
			return alarmTime.getTime();

		} else {
			return null;
		}
	}

	public static void setAlarm(Context context) {
		try {
			// set the time when we want to be woken up for the next message of the
			// day
			Date msgTime = getTimeForNextMessage(context);
			Log.i(DailyVersesPlugin.class.getName(),"setAlarm: " + msgTime);
			setAlarm(context, msgTime);
		} catch (JSONException e) {
			throw new RuntimeException(e);
		}
	}
}
