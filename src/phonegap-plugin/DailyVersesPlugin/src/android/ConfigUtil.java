package de.christiansteinert.dailyversesplugin;

import java.util.Date;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.ArrayList;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import de.christiansteinert.dailyversesplugin.*;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.SharedPreferences;
import android.util.Log;
import android.content.res.Resources ;
import android.content.Context;
import android.os.Build;
import android.os.LocaleList;

public class ConfigUtil {
   public static final String[] UI_LANGUAGES = {"en", "ar", "de", "zh-cn", "zh-tw", "ru", "bo"};
   public static final String[] TEXT_LANGUAGES = {"en", "ar", "de", "zh-cn", "zh-tw", "ru", "bo", "bo-wylie","sa","sa-devanagari","sa-harvard-kyoto"}; 

   /**
	 * Configuration ID: the setting that controls whether a message that contains
	 * the verse of the day is generated or not.
	 */
	public static final String CFG_MSG_ENABLED = "messageEnabled";

	/**
	 * Configuration ID: the setting that controls the hour of messages that are
	 * generated
	 */
	public static final String CFG_MSG_HOUR = "messageHour";

	/**
	 * Configuration ID: setting that controls the minute of messages that are
	 * generated
	 */
	public static final String CFG_MSG_MINUTE = "messageMinute";
	
	/**
	 * Configuration ID: setting that controls which language is being used 
	 * for the user interface
	 */
    public static final String CFG_UI_LANGUAGE = "uiLanguage";

    /**
	 * Configuration ID: setting that controls which language is being used 
	 * to read the verses
	 */
    public static final String CFG_TEXT_LANGUAGE = "textLanguage";

    /**
	 * Configuration ID: setting that controls which language is being used 
	 * to read the verses in the secondary language
	 */
    public static final String CFG_TEXT_LANGUAGE2 = "textLanguage2";

    /**
	 * Configuration ID: setting that controls which language is being used 
	 * to read the verses in the tertiary language
	 */
    public static final String CFG_TEXT_LANGUAGE3 = "textLanguage3";

    /**
	 * Configuration ID: setting that controls the localized string "Verse of the Day" for the currently selected UI language
	 */
    public static final String CFG_VERSE_OF_THE_DAY_TXT = "verseOfTheDay";

    /**
	 * String "Verse of the Day" in English
	 */
    public static final String VERSE_OF_THE_DAY_TXT_DEFAULT = "Verse of the Day";
	
	/**
	 * Configuration ID: setting that controls which text file is being used 
	 * to read the verses
	 */
	public static final String CFG_VERSE_FILE = "versesFile";
	

    /**
     * default language 
     */
    public static final String DEFAULT_LANGUAGE = "en";
	
	/**
	 * name pattern for the verse file
     */
	public static final String VERSE_FILE_PATTERN = "content/text_%s.txt";

	/**
	 * Configuration ID: time stamp when a verse of the day - message was last
	 * shown
	 */
	public static final String LAST_MSG_SHOWN = "msgLastShownTimestamp";

	/**
	 * Path of web resources within the Cordova project
         */ 
	public static final String C_RESOURCE_PATH = "www/";
	
	/**
	 * save the text for the next verse
	 */
	public static final String NEXT_VERSE_TEXT = "nextVerseText";

	public ConfigUtil() {
		super();
	}

	/**
	 * Save the configuration settings
	 * 
	 * @param settings
	 *          a JSON object containing the settings for the application, similar
	 *          to the following:
	 * 
	 * <pre>
     * { messageEnabled:true, messageHour:10, messageMinute:0, :'en', textLanguage:'en', textLanguage2:'' }
	 * </pre>
	 * @throws JSONException
	 */
	public static void saveSettings(SharedPreferences prefs, JSONObject settings)
			throws JSONException {

		SharedPreferences.Editor editor = prefs.edit();
		editor.clear( );
		editor.putBoolean(CFG_MSG_ENABLED, settings.getBoolean(CFG_MSG_ENABLED));
		editor.putInt(CFG_MSG_HOUR, settings.getInt(CFG_MSG_HOUR));
		editor.putInt(CFG_MSG_MINUTE, settings.getInt(CFG_MSG_MINUTE));

		editor.putString(CFG_UI_LANGUAGE, settings.getString(CFG_UI_LANGUAGE));
		editor.putString(CFG_TEXT_LANGUAGE, settings.getString(CFG_TEXT_LANGUAGE));
		editor.putString(CFG_TEXT_LANGUAGE2, settings.getString(CFG_TEXT_LANGUAGE2));
		editor.putString(CFG_TEXT_LANGUAGE3, settings.getString(CFG_TEXT_LANGUAGE3));
		editor.putString(CFG_VERSE_OF_THE_DAY_TXT, settings.getString(CFG_VERSE_OF_THE_DAY_TXT));

		editor.commit();
	}

    /**
     * get default language 
     *
     * @return the current device language
     */
	static String getDeviceLang(Context context) {
      //Locale locale = Resources.getSystem().getConfiguration().getLocales().get(0);;
      Locale locale;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
          locale = context.getResources().getConfiguration().getLocales().get(0);
          //locale = LocaleList.getDefault().get(0);
      } else {
          locale = context.getResources().getConfiguration().locale;
      }
	
      String lang = locale.getLanguage().toLowerCase();
      //Log.i(DailyVersesPlugin.class.getCanonicalName(), "getDeviceLang(): Android locale = " + locale.toString() );
      //Log.i(DailyVersesPlugin.class.getCanonicalName(), "getDeviceLang(): Android lang = " + lang );
      
      if(lang.startsWith("zh")) { // special handling for Chinese: detect if simplified or traditional
	    String localeStr = locale.toString().toLowerCase(); 
        if(localeStr.contains("hans")) {
          lang = "zh-cn"; // simplified chinese (mainland china, Singapore, etc.)
        } else if(localeStr.contains("hant")||localeStr.contains("tw")||localeStr.contains("hk")||localeStr.contains("mo")) {
          lang = "zh-tw"; // traditional chinese (Taiwan, Honkong, etc.)
        } else { 
          lang = "zh-cn"; // simplified chinese (mainland china, Singapore, etc.)
        }
      } 
      
      //Log.i(DailyVersesPlugin.class.getCanonicalName(), "getDeviceLang(): determined language = " + lang);
            
      return lang;
	}
	
	static String getDefaultUILang(Context context) {
	  String lang = getDeviceLang(context);
      for(String uiLang: UI_LANGUAGES) {
        if(uiLang.equals(lang))
          return lang;
      }
      return DEFAULT_LANGUAGE; //fallback to English for unsupported languages
	} 
	
	static String getDefaultTextLang(Context context) {
	  String lang = getDeviceLang(context);
      for(String uiLang: TEXT_LANGUAGES) {
        if(uiLang.equals(lang))
          return lang;
      }
      return DEFAULT_LANGUAGE; //fallback to English for unsupported languages
	} 
	
	
	/**
	 * read the configuration settings
	 * 
	 * @return a JSON object with configuration settings, similar to the
	 *         following:
	 * 
	 *         <pre>
	 * { messageEnabled:true, messageHour:10, messageMinute:0 }
	 * </pre>
	 * @throws JSONException
	 */
	public static JSONObject readSettings(Context context, SharedPreferences prefs) {
		boolean msgEnabled = prefs.getBoolean(CFG_MSG_ENABLED, true);
		int msgHour = prefs.getInt(CFG_MSG_HOUR, 10);
		int msgMinute = prefs.getInt(CFG_MSG_MINUTE, 0);
		String defaultUILang = getDefaultUILang(context);
		String defaultTxtLang = getDefaultTextLang(context);
		String uiLang = prefs.getString(CFG_UI_LANGUAGE, defaultUILang);
		String textLang = prefs.getString(CFG_TEXT_LANGUAGE, defaultTxtLang);
		String textLang2 = prefs.getString(CFG_TEXT_LANGUAGE2, "");
		String textLang3 = prefs.getString(CFG_TEXT_LANGUAGE3, "");
		String verseOfTheDay = prefs.getString(CFG_VERSE_OF_THE_DAY_TXT, VERSE_OF_THE_DAY_TXT_DEFAULT); 

		
		Log.i(DailyVersesPlugin.class.getCanonicalName(), ConfigUtil.class.getName()
				+ ".readSettings() - enabled:"
				+ msgEnabled
				+ "; msgHour:"
				+ msgHour
				+ "; msgMinute:"
				+ msgMinute);

		JSONObject result = new JSONObject();
        try {
            result.put(CFG_MSG_ENABLED, msgEnabled);
            result.put(CFG_MSG_HOUR, msgHour);
            result.put(CFG_MSG_MINUTE, msgMinute);
            result.put(CFG_UI_LANGUAGE, uiLang);
            result.put(CFG_TEXT_LANGUAGE, textLang);
            result.put(CFG_TEXT_LANGUAGE2, textLang2);
            result.put(CFG_TEXT_LANGUAGE3, textLang3);
            result.put(CFG_VERSE_OF_THE_DAY_TXT, verseOfTheDay);
		} catch( JSONException e) {
		}

		Log.i(DailyVersesPlugin.class.getCanonicalName(),
				"<--- Returning" + result.toString());

		return result;
	}

	/**
	 * remember the most recent time when the message of the day had been shown.
	 * This is needed so that we don't show it again on the same day.
	 * 
	 * @param lastShownTime
	 *          the date and time when the last message was generated
	 */
	public static void saveLastMessageTime(SharedPreferences prefs,
			Date lastShownTime) {
		SharedPreferences.Editor editor = prefs.edit();
		editor.putLong(LAST_MSG_SHOWN, lastShownTime.getTime());

		editor.commit();
	}

	/**
	 * get the most recent time when the message of the day had been shown. This
	 * is needed so that we know after a reboot or other cases of missing our intended timer 
	 * that we should show the message.
	 * 
	 * @return lastShownTime the date and time when the last message was
	 *         generated. If no message was ever generated then null is returned.
	 */
	public static Date readLastMessageTime(SharedPreferences prefs) {
		long resultTimestamp = prefs.getLong(LAST_MSG_SHOWN, 0);
		if (resultTimestamp > 0)
			return new Date(resultTimestamp);
		else
			return null;
	}

	
	/**
	 * read and parse all verses for the text
	 * @returns the text for each verse
     */
	public static List<Chapter> readAllVerses(Context context, SharedPreferences prefs) {
        List<Chapter> chapters = new ArrayList<Chapter>();
        try { 
            JSONObject settings = readSettings(context,prefs);
            String verseLang = prefs.getString(CFG_TEXT_LANGUAGE, DEFAULT_LANGUAGE);
            String verseFile = String.format(VERSE_FILE_PATTERN, verseLang);

            InputStream in = context.getAssets().open(C_RESOURCE_PATH + verseFile); 
            BufferedReader reader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
            
            String line;
            ArrayList<String> verseLines = new ArrayList<String>();
            Chapter currentChapter = null;
            while( ( line = reader.readLine() ) != null ) {
            line = line.trim();
            line = line.replace("•","\u200b"); // replace hyphenation point for Sanskrit with zero-width space to allow for line breaking
            line = line.replace("་","་\u200b"); // after Tibetan tseg insert zero-width space to allow for line breaking
            if( line.startsWith("***") ) { // lines that start with *** contain a chapter title and start the next chapter
                String chapterName = line.replace("***","");
                currentChapter = new Chapter( chapterName );
                chapters.add(currentChapter);
            } else if (line.isEmpty()) {  // empty lines are used to separate verses from each other
                if ( verseLines.size() > 0 ) {
                currentChapter.addVerse(verseLines.toArray(new String[0]));
                verseLines.clear();
                }
            } else { // this is a normal line which must be part of a verse
                verseLines.add(line);
            }
            }
            if(verseLines.size() > 0) { // add the last verse at the end of the file to the chapter as well
                currentChapter.addVerse(verseLines.toArray(new String[0]));
            }            
        } catch( Exception e) { }
        
        return chapters;
	}

    public static int getRandomIntWithSeed(int seed,int maxValue) {
        double randomNumber = Double.valueOf("0." + new Double(Math.sin(seed)).toString().substring(7));
        return (int) ((maxValue+1)*randomNumber);
    }
    
    /**
     * Adjust a verse by removing the verse number that is contained at the beginning of the verse 
     * and instead adding a chapter and verse number to the end of the verse.
     */
    public static String[] adjustVerseText(int chapterNum, int verseNumInChapter, String[] verseText) {
        String[] result = new String[verseText.length];
        for(int i=0;i<verseText.length;i++) {
            String line = verseText[i];
            if (i == 0) {
              // remove old verse number which is contained in brackets at the beginning of the first line
              line = line.replaceAll("^\\([0-9]+\\) *", ""); 
              // remove old verse number for Arabic:
              line = line.replaceAll("^\\([١٢٣٤٥٦٧٨٩٠]+\\) *", ""); 
              // remove old verse number for Tibetan:
              line = line.replaceAll("^[༡༢༣༤༥༦༧༨༩༠]+༽ *", "།");
              // remove old verse number for Devanagari:
              line = line.replaceAll("^\\([१२३४५६७८९०]+\\) *", ""); 
            }
            if (i == verseText.length - 1) {
              // add a chapter and verse number at the end of the last line
              line += " ["+chapterNum+"."+verseNumInChapter+"]";
            }
            result[i] = line;
        }
        return result;
    }
    
    public static String[] readVerseOfTheDay(Context context, SharedPreferences prefs) {
        Calendar now = Calendar.getInstance();
        while(true) {
          String[] verseContent = doReadVerseOfTheDay(context, prefs, now);
          if(verseContent == null) {
            return null;
          } else if(isDummyVerse(verseContent)) {
            // This verse does not exist in the  given language. Jump back one year to see if we have a reasonable verse there.
            now.set(Calendar.YEAR, now.get(Calendar.YEAR) - 1 );
          } else {
            // We found a verse that exists. Return it.
            return verseContent;
          }
        }
    }
    
    static boolean isDummyVerse(String[] verseText) {
      if(verseText[0].contains("[[") || 
        (verseText.length == 1 && verseText[0].length() < 15 )) {
        return true;
      } else {
        return false;
      }
    }

    static String[] doReadVerseOfTheDay(Context context, SharedPreferences prefs, Calendar now) {
        // read all chapters and determine the total number of verses
        List<Chapter> chapters = readAllVerses( context, prefs );
        int totalVerseCount = 0;
        for(Chapter chapter: chapters) {
          totalVerseCount += chapter.size();
        }
		Log.i(DailyVersesPlugin.class.getCanonicalName(), "total number of verses: " + totalVerseCount);

        // determine the number of the verse of the day
        Log.i(DailyVersesPlugin.class.getCanonicalName(), "now:" + now.toString());
    
        int randSeedForTheDay = (now.get(Calendar.YEAR))*400+now.get(Calendar.MONTH)*31+now.get(Calendar.DATE);
		Log.i(DailyVersesPlugin.class.getCanonicalName(), "rand seed: " + randSeedForTheDay);

        int verseOfTheDay = getRandomIntWithSeed(randSeedForTheDay, totalVerseCount - 1);
		Log.i(DailyVersesPlugin.class.getCanonicalName(), "verse: " + verseOfTheDay);
    
        // find that verse within the chapters and return its content
        int verseCount = 0;
        int chapterNum = 0;
        int verseNum = 0;
        for(Chapter chapter2: chapters) {
          chapterNum++;
          if(verseOfTheDay < verseCount + chapter2.size()) {
             int verseNumInChapter = verseOfTheDay - verseCount + 1;
             String[] verseText = chapter2.getVerse(verseOfTheDay - verseCount);
             return adjustVerseText(chapterNum, verseNumInChapter, verseText);
          }
          verseCount += chapter2.size();
        }
        return null;
    }
}
