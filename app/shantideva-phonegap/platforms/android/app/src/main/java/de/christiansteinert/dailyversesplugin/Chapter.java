package de.christiansteinert.dailyversesplugin;

import de.christiansteinert.dailyversesplugin.*;

import java.util.List;
import java.util.ArrayList;

/**
 * This class represents a chapter
 */
public class Chapter  {
  String title;
  List<String[]> verses = new ArrayList<String[]>();
  
  public Chapter(String title) {
    this.title = title;
  }

  public void addVerse(String[] verseLines) {
    verses.add( verseLines );
  }
  
  
  public int size() {
    return verses.size();
  }
  
  public String[] getVerse( int verseNr ) {
    return verses.get( verseNr );
  }
  
}
