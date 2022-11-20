package de.christiansteinert.dailyversesplugin;

import java.util.List;
import java.util.ArrayList;

/**
 * Represents a chapter within the text.
 */
public final class Chapter {
    final String title;
    final List<String[]> verses = new ArrayList<>();

    public Chapter(final String title) {
        this.title = title;
    }

    public void addVerse(final String[] verseLines) {
        verses.add(verseLines);
    }

    public int size() {
        return verses.size();
    }

    public String[] getVerse(final int verseNr) {
        return verses.get(verseNr);
    }

}
