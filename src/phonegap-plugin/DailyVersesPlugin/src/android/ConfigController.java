package de.christiansteinert.dailyversesplugin;

import java.util.Date;
import java.util.Locale;

import org.json.JSONException;
import org.json.JSONObject;

import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.util.Log;
import android.content.Context;
import android.os.Build;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public final class ConfigController {
    /**
     * ID of the Android Notification channel for the verse of the day
     */
    public static final String NOTIFICATION_CHANNEL_ID = "verseOfTheDay";

    /**
     * languages in which the user interface is available
     */
    private static final String[] UI_LANGUAGES = {"en", "ar", "de", "zh-cn", "zh-tw", "ru", "bo"};

    /**
     * languages in which Shantideva's text is available
     */
    private static final String[] TEXT_LANGUAGES = {"en", "ar", "de", "zh-cn", "zh-tw", "ru", "bo", "bo-wylie", "sa", "sa-devanagari", "sa-harvard-kyoto"};

    /**
     * Configuration ID: the setting that controls whether a message that contains
     * the verse of the day is generated or not.
     */
    private static final String CFG_MSG_ENABLED = "messageEnabled";

    /**
     * Configuration ID: the setting that controls the hour when a notification is generated
     */
    private static final String CFG_MSG_HOUR = "messageHour";

    /**
     * Configuration ID: setting that controls the minute when a notification is generated
     */
    private static final String CFG_MSG_MINUTE = "messageMinute";

    /**
     * Configuration ID: setting that controls which language is being used
     * for the user interface
     */
    private static final String CFG_UI_LANGUAGE = "uiLanguage";

    /**
     * Configuration ID: setting that controls which primary language is being used to read the
     * verses of the text and show the verse of the day as Android notification message
     */
    private static final String CFG_TEXT_LANGUAGE = "textLanguage";

    /**
     * Configuration ID: setting that controls which language is being used
     * to read the verses in the secondary language
     */
    private static final String CFG_TEXT_LANGUAGE2 = "textLanguage2";

    /**
     * Configuration ID: setting that controls which language is being used
     * to read the verses in the tertiary language
     */
    private static final String CFG_TEXT_LANGUAGE3 = "textLanguage3";

    /**
     * Configuration ID: setting that controls the localized string "Verse of the Day" for the currently selected UI language
     */
    private static final String CFG_VERSE_OF_THE_DAY_TXT = "verseOfTheDay";

    /**
     * Configuration ID: setting that controls the font size
     */
    private static final String CFG_FONT_SIZE = "fontSize";

    /**
     * Configuration ID: setting that controls the color theme
     */
    private static final String CFG_COLOR_THEME = "colorTheme";

    /**
     * Configuration ID: Favorite verses
     */
    private static final String CFG_FAVORITE_VERSES = "favoriteVerses";


    /**
     * String "Verse of the Day" in English
     */
    private static final String VERSE_OF_THE_DAY_TXT_DEFAULT = "Verse of the Day";

    /**
     * default language
     */
    private static final String DEFAULT_LANGUAGE = "en";

    /**
     * Configuration ID: time stamp when a verse of the day - message was last
     * shown
     */
    private static final String LAST_MSG_SHOWN = "msgLastShownTimestamp";

    private final Context context;

    public ConfigController(final Context context) {
        super();
        this.context = context;
    }

    private SharedPreferences getPreferences() {
        return context.getSharedPreferences(DailyVersesPlugin.class.getName(),
                Context.MODE_PRIVATE);
    }

    /**
     * Save the configuration settings
     * The Settings are a JSON object that should be similar to the following:
     * <pre>
     * {
     *   messageEnabled:true,
     *   messageHour:10,
     *   messageMinute:0,
     *   uiLanguage:'en',
     *   textLanguage:'en',
     *   textLanguage2:'',
     *   textLanguage3:'',
     *   fontSize:100,
     *   colorTheme:'light'
     * }
     * </pre>
     *
     * @param settingsToSave a JSON object containing the settings for the application.
     */
    public void saveSettings(final JSONObject settingsToSave) {
        try {
            final SharedPreferences preferences = getPreferences();
            final SharedPreferences.Editor preferencesEditor = preferences.edit();
            preferencesEditor.putBoolean(CFG_MSG_ENABLED, settingsToSave.getBoolean(CFG_MSG_ENABLED));
            preferencesEditor.putInt(CFG_MSG_HOUR, settingsToSave.getInt(CFG_MSG_HOUR));
            preferencesEditor.putInt(CFG_MSG_MINUTE, settingsToSave.getInt(CFG_MSG_MINUTE));

            preferencesEditor.putString(CFG_UI_LANGUAGE, settingsToSave.getString(CFG_UI_LANGUAGE));
            preferencesEditor.putString(CFG_TEXT_LANGUAGE, settingsToSave.getString(CFG_TEXT_LANGUAGE));
            preferencesEditor.putString(CFG_TEXT_LANGUAGE2, settingsToSave.getString(CFG_TEXT_LANGUAGE2));
            preferencesEditor.putString(CFG_TEXT_LANGUAGE3, settingsToSave.getString(CFG_TEXT_LANGUAGE3));
            preferencesEditor.putString(CFG_VERSE_OF_THE_DAY_TXT, settingsToSave.getString(CFG_VERSE_OF_THE_DAY_TXT));

            preferencesEditor.putInt(CFG_FONT_SIZE, settingsToSave.getInt(CFG_FONT_SIZE));
            preferencesEditor.putString(CFG_COLOR_THEME, settingsToSave.getString(CFG_COLOR_THEME));
            preferencesEditor.apply();

            if(settingsToSave.getBoolean(CFG_MSG_ENABLED)) {
                requestNotificationPermissions();
            }

        } catch (final JSONException e) {
            Log.e(DailyVersesPlugin.class.getCanonicalName(), "Error while saving config", e);
        }

    }

    private void requestNotificationPermissions() {
        //Starting with Android 13 it is necessary to request a permission before we are allowed to show notifications
        if (Build.VERSION.SDK_INT >= 33 && context instanceof Activity) { 
            Activity activity = (Activity) context;

            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.POST_NOTIFICATIONS},101);
            }
        }
    }

    public void saveFavoriteVerses(final String verseData) {
        Log.i(DailyVersesPlugin.class.getCanonicalName(), "Saving favirte verses:" + verseData);
        final SharedPreferences preferences = getPreferences();
        final SharedPreferences.Editor preferencesEditor = preferences.edit();
        preferencesEditor.putString(CFG_FAVORITE_VERSES, verseData);
        preferencesEditor.apply();
    }

    /**
     * get default language
     *
     * @return the current device language
     */
    private String getDeviceLanguage() {
        final Locale locale;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            locale = context.getResources().getConfiguration().getLocales().get(0);
        } else {
            locale = context.getResources().getConfiguration().locale;
        }

        final String localeLanguage = locale.getLanguage().toLowerCase();
        final String result;
        if (localeLanguage.startsWith("zh")) { // special handling for Chinese: detect if simplified or traditional
            final String localeStr = locale.toString().toLowerCase();
            if (localeStr.contains("hans")) {
                result = "zh-cn"; // simplified chinese (mainland china, Singapore, etc.)
            } else if (localeStr.contains("hant") || localeStr.contains("tw") || localeStr.contains("hk") || localeStr.contains("mo")) {
                result = "zh-tw"; // traditional chinese (Taiwan, Honkong, etc.)
            } else {
                result = "zh-cn"; // simplified chinese (mainland china, Singapore, etc.)
            }
        } else {
            result = localeLanguage;
        }

        return result;
    }

    /**
     * Determine the default UI language for the application if nothing else has been configured.
     * If the current language of the device is supported in our application then we use the device
     * language as our default language for our app. Otherwise we use English as language for our
     * app.
     */
    private String getDefaultUILang() {
        final String deviceLanguage = getDeviceLanguage();
        for (final String uiLang : UI_LANGUAGES) {
            if (uiLang.equals(deviceLanguage))
                return deviceLanguage;
        }
        return DEFAULT_LANGUAGE; //fallback to English for unsupported languages
    }


    /**
     * Determine the default language for Shantideva's text if nothing else has been configured.
     * If we have a Shantideva translation in the language that is the current language of the
     * device then we use the device language as our default language for the text. Otherwise we use
     * English.
     */
    String getDefaultTextLang() {
        final String deviceLanguage = getDeviceLanguage();
        for (final String uiLang : TEXT_LANGUAGES) {
            if (uiLang.equals(deviceLanguage))
                return deviceLanguage;
        }
        return DEFAULT_LANGUAGE; //fallback to English for unsupported languages
    }


    /**
     * Read the configuration settings.
     *
     * @return a JSON object with configuration settings
     * @see #saveSettings(JSONObject)  for an example of how the returned settings object looks
     */
    public JSONObject getSettingsAsJson() {
        final SharedPreferences preferences = getPreferences();
        final boolean msgEnabled = preferences.getBoolean(CFG_MSG_ENABLED, true);
        final int msgHour = preferences.getInt(CFG_MSG_HOUR, 10);
        final int msgMinute = preferences.getInt(CFG_MSG_MINUTE, 0);
        final String defaultUILang = getDefaultUILang();
        final String defaultTxtLang = getDefaultTextLang();
        final String uiLang = preferences.getString(CFG_UI_LANGUAGE, defaultUILang);
        final String textLang = preferences.getString(CFG_TEXT_LANGUAGE, defaultTxtLang);
        final String textLang2 = preferences.getString(CFG_TEXT_LANGUAGE2, "");
        final String textLang3 = preferences.getString(CFG_TEXT_LANGUAGE3, "");
        final String verseOfTheDay = preferences.getString(CFG_VERSE_OF_THE_DAY_TXT,
                VERSE_OF_THE_DAY_TXT_DEFAULT);
        final int fontSize = preferences.getInt(CFG_FONT_SIZE, 100);
        final String colorTheme = preferences.getString(CFG_COLOR_THEME, null);

        Log.i(DailyVersesPlugin.class.getCanonicalName(), ConfigController.class.getName()
                + ".readSettings() - enabled:"
                + msgEnabled
                + "; msgHour:"
                + msgHour
                + "; msgMinute:"
                + msgMinute);

        final JSONObject result = new JSONObject();
        try {
            result.put(CFG_MSG_ENABLED, msgEnabled);
            result.put(CFG_MSG_HOUR, msgHour);
            result.put(CFG_MSG_MINUTE, msgMinute);
            result.put(CFG_UI_LANGUAGE, uiLang);
            result.put(CFG_TEXT_LANGUAGE, textLang);
            result.put(CFG_TEXT_LANGUAGE2, textLang2);
            result.put(CFG_TEXT_LANGUAGE3, textLang3);
            result.put(CFG_VERSE_OF_THE_DAY_TXT, verseOfTheDay);
            result.put(CFG_FONT_SIZE, fontSize);
            result.put(CFG_COLOR_THEME, colorTheme);
        } catch (final JSONException e) {
            Log.e(DailyVersesPlugin.class.getCanonicalName(), "Error while loading settings", e);
        }

        if(msgEnabled) {
            requestNotificationPermissions();
        }

        Log.i(DailyVersesPlugin.class.getCanonicalName(),
                "<--- Returning" + result);

        return result;
    }

    public String readFavoriteVerses() {
        final SharedPreferences preferences = getPreferences();
        final String result = preferences.getString(CFG_FAVORITE_VERSES, "{}"); 
        Log.i(DailyVersesPlugin.class.getCanonicalName(), "<--- Returning favorite verses" + result);
        return result;
    }

    /**
     * Remember the most recent time when the message of the day had been shown.
     * This is needed so that we don't show it again on the same day.
     *
     * @param lastShownTime the date and time when the last message was generated
     */
    public void saveLastMessageTime(final Date lastShownTime) {
        final SharedPreferences.Editor preferencesEditor = getPreferences().edit();
        preferencesEditor.putLong(LAST_MSG_SHOWN, lastShownTime.getTime());
        preferencesEditor.apply();
    }

    /**
     * get the most recent time when the message of the day had been shown. This
     * is needed so that we know after a reboot or other cases of missing our intended timer
     * that we should show the message.
     *
     * @return lastShownTime the date and time when the last message was
     * generated. If no message was ever generated then null is returned.
     */
    public @Nullable
    Date getLastMessageTime() {
        final long resultTimestamp = getPreferences().getLong(LAST_MSG_SHOWN, 0);
        if (resultTimestamp > 0)
            return new Date(resultTimestamp);
        else
            return null;
    }

    public String getVerseOfTheDayTxt() {
        final String text = getPreferences().getString(CFG_VERSE_OF_THE_DAY_TXT, VERSE_OF_THE_DAY_TXT_DEFAULT);
        return text.replace("&nbsp;", " ");
    }

    public String getVerseLanguage() {
        return getPreferences().getString(CFG_TEXT_LANGUAGE, DEFAULT_LANGUAGE);
    }

    public boolean isNotificationEnabled() {
        return getPreferences().getBoolean(CFG_MSG_ENABLED, true);
    }

    public int getNotificationHour() {
        return getPreferences().getInt(CFG_MSG_HOUR, 10);
    }

    public int getNotificationMinute() {
        return getPreferences().getInt(CFG_MSG_MINUTE, 0);
    }


    public void createVerseOfTheDayNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        final String verseOfTheDayTxt = getVerseOfTheDayTxt();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            final NotificationChannel channel = new NotificationChannel(
                    NOTIFICATION_CHANNEL_ID,
                    verseOfTheDayTxt,
                    NotificationManager.IMPORTANCE_LOW);

            // Starting with Android 26 each notification must be associated with a notification
            // channel. If the channel does not exist yet we need to create it before sending
            // the notification
            final NotificationManager notificationManager =
                    context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

}
