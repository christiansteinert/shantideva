package de.christiansteinert.dailyversesplugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import android.app.Activity;
import android.util.Log;
import android.os.Build;
import android.content.res.Configuration;
import android.graphics.Color;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.NonNull;
import de.christiansteinert.dailyversesplugin.util.AlarmUtil;
import de.christiansteinert.dailyversesplugin.util.ThreadUtil;

/**
 * This class is the main helper class for Android code and is directly called by Javascript
 */
public class DailyVersesPlugin extends CordovaPlugin {
    private Activity getActivity() {
        return cordova.getActivity();
    }

    @Override
    public boolean execute(final String action,
                           final JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (Build.VERSION.SDK_INT >= 29) {
            // force the nav bar to black if Android is in night mode; this is necessary on some Samsung devices which
            // keep a white navigation bar even when the device in night mode
            ThreadUtil.runInMainUiThread(() -> {
                final int currentNightMode = getActivity().getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
                if (currentNightMode == Configuration.UI_MODE_NIGHT_YES) {
                    final Window window = getActivity().getWindow();
                    window.clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);

                    int uiOptions = window.getDecorView().getSystemUiVisibility();
                    uiOptions = uiOptions | WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS;
                    uiOptions = uiOptions & ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                    window.getDecorView().setSystemUiVisibility(uiOptions);

                    window.setNavigationBarColor(Color.BLACK);
                }
            });
        }

        if ("saveConfig".equals(action)) {
            // This action expects only a single object as parameter. This object contains the
            // configuration data to be saved redundantly on the Java side. The JSON must have
            // the structure described in the Javadoc of ConfigController.saveSettings(...).
            saveSettingsFromJson(args.getJSONObject(0));

            // Newly schedule the next notification message because notification settigns may
            // have changed
            AlarmUtil.setNextAlarm(getActivity());

            // query the user for permissions to show notifications
            AlarmUtil.requestNotificationPermission(this, getActivity());

            callbackContext.success();
            return true;

        } else if ("loadConfig".equals(action)) {
            // the loadConfig action expects no parameters. It will return a JSON
            // object with the same structure that saveConfig expects as input
            // parameter.
            JSONArray settings = new JSONArray();
            settings.put(getSettingsAsJson());
            settings.put(getFavoriteVerses());
            callbackContext.success(settings);
            return true;

        } else if ("saveFavoriteVerses".equals(action)) {
            saveFavoriteVerses(args.getString(0));
            callbackContext.success();
            return true;

        } else if ("loadFavoriteVerses".equals(action)) {
            callbackContext.success(getFavoriteVerses());
            return true;

        } else if ("setAlarm".equals(action)) {
            // query the user for permissions to show notifications
            AlarmUtil.requestNotificationPermission(this, getActivity());

            // Schedule the next notification for showing the verse of the day
            AlarmUtil.setNextAlarm(getActivity());
            callbackContext.success();
            return true;

        } else if ("getNextMessageTime".equals(action)) {
            /*
             * this action expects no parameters. It will return a JSON object that
             * contains the date and time for the next message that will be generated.
             */
            callbackContext.success(getNextMessageTimeAsJson());
            return true;

        } else if ("ping".equals(action)) {
            //  this action requires no arguments. It will return a test message when being called
            //  to signal that the communication with the plugin code has worked.
            callbackContext.success(new JSONObject().put("response", "ping received"));
            return true;

        } else if ("testTimer".equals(action)) {
            // This action requires no arguments. It will set a timer that fires 10
            // seconds later and should trigger a message
            testTimer();
            callbackContext.success();
            return true;

        } else if ("testNotification".equals(action)) {
            // this action requires no arguments. It will generate a notification right away
            testNotification();

            callbackContext.success();
            return true;
        } else {
            // unknown action; return false to trigger a "MethodNotFound" error
            // for the JavaScript code
            return false;
        }
    }

    private void saveFavoriteVerses(String favoriteVerseInfo) {
        final ConfigController config = new ConfigController(getActivity());
        config.saveFavoriteVerses(favoriteVerseInfo);
    }

    private String getFavoriteVerses() {
        final ConfigController config = new ConfigController(getActivity());
        return config.readFavoriteVerses();
    }

    private JSONObject getNextMessageTimeAsJson() throws JSONException {
        final JSONObject result = new JSONObject();
        final Date nextMsgDate = AlarmUtil.getTimeForNextMessage(getActivity());
        if (nextMsgDate != null) {
            final Calendar date = new GregorianCalendar();
            date.setTime(nextMsgDate);

            result.put("year", date.get(Calendar.YEAR));
            result.put("month", date.get(Calendar.MONTH));
            result.put("day", date.get(Calendar.DAY_OF_MONTH));
            result.put("hour", date.get(Calendar.HOUR_OF_DAY));
            result.put("minute", date.get(Calendar.MINUTE));
        }
        return result;
    }

    private void saveSettingsFromJson(final JSONObject settings) throws JSONException {
        Log.i(DailyVersesPlugin.class.getName(), "saveConfig: " + settings);
        new ConfigController(getActivity()).saveSettings(settings);
    }

    @NonNull
    private JSONObject getSettingsAsJson() {
        return new ConfigController(getActivity()).getSettingsAsJson();
    }

    private void testTimer() {
        final Calendar msgTime = new GregorianCalendar();
        msgTime.add(Calendar.SECOND, 10);
        AlarmUtil.setAlarm(getActivity(), msgTime.getTime(), AlarmReceiver.class);
    }

    private void testNotification() {
        ThreadUtil.runInMainUiThread(() -> {
            Log.i(this.getClass().getName(),
                    "=> running cordova.startActivityForResult in order to trigger an intent");
            new AlarmReceiver().onReceive(cordova.getContext(), null);
            Log.i(this.getClass().getName(),
                    "<= done running cordova.startActivityForResult in order to trigger an intent");
        });
    }
}
