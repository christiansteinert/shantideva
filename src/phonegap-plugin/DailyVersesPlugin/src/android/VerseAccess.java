package de.christiansteinert.dailyversesplugin;

import android.content.Context;
import android.util.Log;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

public final class VerseAccess {
    /**
     * name pattern for the verse files, containing a placeholder for the language
     */
    private static final String VERSE_FILE_PATTERN = "content/text_%s.txt";

    /**
     * Path of web resources within the Cordova project
     */
    private static final String C_RESOURCE_PATH = "www/";

    public static String[] getVerseOfTheDay(final Context context) {
        final Calendar now = new GregorianCalendar();
        while (true) {
            final String[] verseContent = readVerseOfTheDay(context, now);
            if (isDummyVerse(verseContent)) {
                // This verse does not exist in the given language. Jump back one year to see if we have a reasonable verse there.
                now.set(Calendar.YEAR, now.get(Calendar.YEAR) - 1);
            } else {
                // We found a verse that exists. Return it.
                return verseContent;
            }
        }
    }

    /**
     * read and parse all verses for the text
     *
     * @return the text for each verse
     */
    private static List<Chapter> readAllVerses(final Context context) {

        final List<Chapter> chapters = new ArrayList<>();
        final String verseLang = new ConfigController(context).getVerseLanguage();
        final String verseFile = String.format(VERSE_FILE_PATTERN, verseLang);

        try (final InputStream in = context.getAssets().open(C_RESOURCE_PATH + verseFile)) {
            final BufferedReader reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8));

            String line;
            final ArrayList<String> verseLines = new ArrayList<>();
            Chapter currentChapter = null;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                line = line.replace("•", "\u200b"); // replace hyphenation point for Sanskrit with zero-width space to allow for line breaking
                line = line.replace("་", "་\u200b"); // after Tibetan tseg insert zero-width space to allow for line breaking
                if (line.startsWith("***")) { // lines that start with *** contain a chapter title and start the next chapter
                    final String chapterName = line.replace("***", "");
                    currentChapter = new Chapter(chapterName);
                    chapters.add(currentChapter);
                } else if (line.isEmpty() && currentChapter != null) {  // empty lines are used to separate verses from each other
                    if (verseLines.size() > 0) {
                        currentChapter.addVerse(verseLines.toArray(new String[0]));
                        verseLines.clear();
                    }
                } else { // this is a normal line which must be part of a verse
                    verseLines.add(line);
                }
            }
            if (currentChapter != null && verseLines.size() > 0) { // add the last verse at the end of the file to the chapter as well
                currentChapter.addVerse(verseLines.toArray(new String[0]));
            }
        } catch (final Exception e) {
            Log.e(DailyVersesPlugin.class.getCanonicalName(), "unable to read " + verseFile);
        }

        return chapters;
    }

    /**
     * Transforms an input value into a pseudo random value. A particular "seed" will always produce
     * the same result.
     * Note: random number generation must be maintained in an identical way on the Java and
     * JavaScript code side of the application because both implementatins do the same type of
     * calculation to determine the "random" verse for the current day.
     */
    private static int getRandomIntForSeed(final int seed, final int maxValue) {
        final double randomNumber = Double.parseDouble("0." + Double.toString(Math.sin(seed)).substring(7));
        return (int) ((maxValue + 1) * randomNumber);
    }

    /**
     * Adjust a verse by removing the verse number that is contained at the beginning of the verse
     * and instead adding a chapter and verse number to the end of the verse.
     */
    private static String[] moveVerseNumberFromStartToEnd(
            final int chapterNum,
            final int verseNumInChapter,
            final String[] verseLines) {

        final String[] result = new String[verseLines.length];
        for (int i = 0; i < verseLines.length; i++) {
            String line = verseLines[i];
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
            if (i == verseLines.length - 1) {
                // add a chapter and verse number at the end of the last line
                line += " [" + chapterNum + "." + verseNumInChapter + "]";
            }
            result[i] = line;
        }
        return result;
    }

    /**
     * Checks if a verse is a dummy verse for which no translation exists yet in the current
     * language.
     */
    private static boolean isDummyVerse(final String[] verseText) {
        if (verseText[0].contains("[[") ||
                (verseText.length == 1 && verseText[0].length() < 15)) {
            return true;
        }
        return false;
    }

    private static String[] readVerseOfTheDay(
            final Context context,
            final Calendar now) {

        // read all chapters and determine the total number of verses
        final List<Chapter> chapters = readAllVerses(context);
        int totalVerseCount = 0;
        for (final Chapter chapter : chapters) {
            totalVerseCount += chapter.size();
        }
        Log.i(DailyVersesPlugin.class.getCanonicalName(), "total number of verses: " + totalVerseCount);

        // determine the number of the verse of the day
        Log.i(DailyVersesPlugin.class.getCanonicalName(), "now:" + now.toString());

        final int randSeedForTheDay = (now.get(Calendar.YEAR)) * 400 + now.get(Calendar.MONTH) * 31 + now.get(Calendar.DATE);
        Log.i(DailyVersesPlugin.class.getCanonicalName(), "rand seed: " + randSeedForTheDay);

        final int verseOfTheDay = getRandomIntForSeed(randSeedForTheDay, totalVerseCount - 1);
        Log.i(DailyVersesPlugin.class.getCanonicalName(), "verse: " + verseOfTheDay);

        // find that verse within the chapters and return its content
        int verseCount = 0;
        int chapterNum = 0;
        for (final Chapter chapter : chapters) {
            chapterNum++;
            if (verseOfTheDay < verseCount + chapter.size()) {
                final int verseNumInChapter = verseOfTheDay - verseCount + 1;
                final String[] verseText = chapter.getVerse(verseOfTheDay - verseCount);
                return moveVerseNumberFromStartToEnd(chapterNum, verseNumInChapter, verseText);
            }
            verseCount += chapter.size();
        }
        return new String[0];
    }
}
