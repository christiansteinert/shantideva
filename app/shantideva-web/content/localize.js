/*
simplified Chinese:
"Chinese Translation": 中文翻译
Text title: 入菩萨行论
Shantideva: 寂天菩萨造
"Translated by master Jiqun": 如石法师译

Chinese Translation by Master Jiqun  / 如石法师 (www.putishuyuan.com , www.bodhiacademy.org)

http://www.putishuyuan.com/index.php?app=@article&ac=show&id=13409
 */

/* 
traditional Chinese
"Chinese Translation": 中文翻譯

Text title: 入菩薩行論 

Shantideva:寂天菩薩造  
"Translated by master Jiqun": 如石法師譯

http://www.putishuyuan.com/index.php?app=@article&ac=show&id=13409
*/


var TEXT_LANG_LIST={
    'en':'English',
    'ar':'العربية (Arabic)',
    'de':'Deutsch (German)',
    //'fr':'Français (French)',
    'zh-cn':'简体中文 (Simplified Chinese)',
    'zh-tw':'繁體中文 (Traditional Chinese)',
    'ru':'Русский (Russian)',
    'bo':'བོད་ཡིག་ (Tibetan)',
    'bo-wylie':'བོད་ཡིག་ Wylie (Tibetan / Wylie)',
    'sa-devanagari':'Sanskrit (Devanagari)',
    'sa':'Sanskrit (IAST)',
    'sa-harvard-kyoto':'Sanskrit (Harvard-Kyoto)'
};

var LANG_LIST={
    'en':'English',
    'ar':'العربية (Arabic)',
    'de':'Deutsch (German)',
    'ru':'Русский (Russian)'
};

var LANG=[];
var LANG_FONTS = 
    '<p>The source code of this app is available at: <a href="https://github.com/christiansteinert/shantideva/" target="_blank" onclick="window.open(\'https://github.com/christiansteinert/shantideva/\',\'_system\');return false;">https://github.com/&#x200b;christiansteinert/&#x200b;shantideva/</a>.</p>'
    +'<hr />'
    +'<p>For Tibetan this app uses the amazing <strong>DDC Uchen</strong> font developed by the outstanding Chris Fynn available from <a href="https://sites.google.com/view/chrisfynn/home/fonts/ddc-uchen" target="_blank" onclick="window.open(\'https://sites.google.com/view/chrisfynn/home/fonts/ddc-uchen\',\'_system\');return false;">https://sites.google.com/&#x200b;view/chrisfynn/&#x200b;home/fonts/&#x200b;ddc-uchen</a>.'
    +'<p>For headings this app uses the wonderfully beautiful Font <strong>Tangerine Bold</strong> by Tashi Omagari, available from <a href="http://www.google.com/fonts/specimen/Tangerine" target="_blank" onclick="window.open(\'http://www.google.com/fonts/specimen/Tangerine\',\'_system\');return false;">http://www.google.com/&#x200b;fonts/&#x200b;specimen/&#x200b;Tangerine</a>.</p><p>Many thanks go to the developers of these fantastic fonts.</p><p>These fonts font are used under the following terms:</p>'
    +'<p>SIL OPEN FONT LICENSE</p>'
    +''
    +'<p>Version 1.1 - 26 February 2007</p>'
    +''
    +'<p>PREAMBLE</p>'
    +'<p>The goals of the Open Font License (OFL) are to stimulate worldwide '
    +'development of collaborative font projects, to support the font creation '
    +'efforts of academic and linguistic communities, and to provide a free and '
    +'open framework in which fonts may be shared and improved in partnership '
    +'with others.</p>'
    +''
    +'<p>The OFL allows the licensed fonts to be used, studied, modified and '
    +'redistributed freely as long as they are not sold by themselves. The '
    +'fonts, including any derivative works, can be bundled, embedded, '
    +'redistributed and/or sold with any software provided that any reserved '
    +'names are not used by derivative works. The fonts and derivatives, '
    +'however, cannot be released under any other type of license. The '
    +'requirement for fonts to remain under this license does not apply '
    +'to any document created using the fonts or their derivatives.</p>'
    +''
    +'<p>DEFINITIONS</p>'
    +'<p>"Font Software" refers to the set of files released by the Copyright '
    +'Holder(s) under this license and clearly marked as such. This may '
    +'include source files, build scripts and documentation.</p>'
    +''
    +'<p>"Reserved Font Name" refers to any names specified as such after the '
    +'copyright statement(s).</p>'
    +''
    +'<p>"Original Version" refers to the collection of Font Software components as '
    +'distributed by the Copyright Holder(s).</p>'
    +''
    +'<p>"Modified Version" refers to any derivative made by adding to, deleting, '
    +'or substituting \u2014 in part or in whole \u2014 any of the components of the '
    +'Original Version, by changing formats or by porting the Font Software to a '
    +'new environment.</p>'
    +''
    +'<p>"Author" refers to any designer, engineer, programmer, technical '
    +'writer or other person who contributed to the Font Software.</p>'
    +''
    +'<p>PERMISSION & CONDITIONS</p>'
    +'<p>Permission is hereby granted, free of charge, to any person obtaining '
    +'a copy of the Font Software, to use, study, copy, merge, embed, modify, '
    +'redistribute, and sell modified and unmodified copies of the Font'
    +'Software, subject to the following conditions:</p>'
    +''
    +'<p>1) Neither the Font Software nor any of its individual components, '
    +'in Original or Modified Versions, may be sold by itself.</p>'
    +''
    +'<p>2) Original or Modified Versions of the Font Software may be bundled, '
    +'redistributed and/or sold with any software, provided that each copy '
    +'contains the above copyright notice and this license. These can be '
    +'included either as stand-alone text files, human-readable headers or '
    +'in the appropriate machine-readable metadata fields within text or '
    +'binary files as long as those fields can be easily viewed by the user.</p>'
    +''
    +'<p>3) No Modified Version of the Font Software may use the Reserved Font '
    +'Name(s) unless explicit written permission is granted by the corresponding '
    +'Copyright Holder. This restriction only applies to the primary font name as '
    +'presented to the users.</p>'
    +''
    +'<p>4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font '
    +'Software shall not be used to promote, endorse or advertise any '
    +'Modified Version, except to acknowledge the contribution(s) of the '
    +'Copyright Holder(s) and the Author(s) or with their explicit written '
    +'permission.</p>'
    +''
    +'<p>5) The Font Software, modified or unmodified, in part or in whole, '
    +'must be distributed entirely under this license, and must not be '
    +'distributed under any other license. The requirement for fonts to '
    +'remain under this license does not apply to any document created '
    +'using the Font Software.</p>'
    +''
    +'<p>TERMINATION</p>'
    +'<p>This license becomes null and void if any of the above conditions are '
    +'not met.</p>'
    +''
    +'<p>DISCLAIMER</p>'
    +'<p>THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, '
    +'EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF '
    +'MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT '
    +'OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE '
    +'COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, '
    +'INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL '
    +'DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING '
    +'FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM '
    +'OTHER DEALINGS IN THE FONT SOFTWARE.</p>'
    +'</div>';

var LANG_TRANSLATIONS = '<p><ul style="text-align:left;"><li>English translation: Dr. Alexander Berzin (translation from Tibetan, clarified on the basis of the Sanskrit version). studybuddhism.com</li>'
    +'<li>Arabic translation: Arjuna Pranidhi, Editing: Engy Badran. الترجمة العربية: أرجُنَ برَنَذي المراجعة: إنجي بدران studybuddhism.com</li>'
    +'<li>German translation / deutsche Übersetzung: Kapitel 1-8 und 10: Christian Dräger, Lektorat: Monika Dräger. Kapitel 9: Christian Steinert, Lektorat: Katja Römmling und Mark Gutsche. studybuddhism.com</li>'
    +'<li>Russian translation / Русский перевод: Евгений Бузиатов. studybuddhism.com</li>'
    +'<li>Tibetan edition:  studybuddhism.com<br /></li>'
    +'</ul></p><hr /><p>The following translations are not affiliated with studybuddhism.com. Many thanks go to the translators / editors of these editions of the text: <ul style="text-align:left;">'
    +'<li>Chinese translation by master Jiqun / 如石法师译 / 如石法師譯. '
    +'<a href="https://www.putishuyuan.com" target="_blank" onclick="window.open(\'https://www.putishuyuan.com\',\'_system\');return false;">www.putishuyuan.com</a>, '
    +'<a href="https://www.bodhiacademy.org" target="_blank" onclick="window.open(\'https://www.bodhiacademy.org\',\'_system\');return false;">www.bodhiacademy.org</a>'
    +'</li>'
    +'<li>Sanskrit edition: Mahoney, Richard, transcriber, Bodhicaryāvatāra of Śāntideva: Sanskrit text (Oxford, North Canterbury: Indica et Buddhica, 2003); '
    +'<a href="https://indica-et-buddhica.org" target="_blank" onclick="window.open(\'https://indica-et-buddhica.org\',\'_system\');return false;">indica-et-buddhica.org</a>, '
    +'</li>'
    +'</ul></p>';
    
var LANG_ABOUT_EN = 'This App displays one verse a day from Shantideva\'s text "Engaging in Bodhisattva Behavior" (Bodhisattvacharyavatara) and allows to read through the entire text. '
    +'"Engaging in Bodhisattva Behavior" is an outstandingly practical and inspiring Buddhist text that covers all the aspects of the Buddhist path. '
    +'Shantideva was a great Indian master who lived during the 8th century CE. Two of his texts survive - the Bodhicharyavatara (the text that is displayed in this app) and the '
    +'Shikshasamuccaya ("Compendium of Trainings"). Both texts are still used to the present day by and especially the Bodhicharyavatara is one of the most cherished and most frequently taught ' 
    +'texts in the Tibetan tradition.'
    +'</p>'
    +'<p><strong>You can find '
    +'<a href="https://studybuddhism.com/en/tibetan-buddhism/original-texts/sutra-texts/engaging-in-bodhisattva-behavior/the-benefits-of-bodhichitta" target="_blank" onclick="window.open(\'https://studybuddhism.com/en/tibetan-buddhism/original-texts/sutra-texts/engaging-in-bodhisattva-behavior/the-benefits-of-bodhichitta\',\'_system\');return false;">'
    +'this text'
    +'</a> '
    +'and much more Buddhist material in many languages at: '
    +'<a href="https://www.studybuddhism.com" target="_blank" onclick="window.open(\'https://www.studybuddhism.com\',\'_system\');return false;">'
    +'studybuddhism.com'
    +'</a></strong></p>'
    +'<p>'
    +'Studybuddhism.com is a website that makes comprehensive material about Buddhism available in 31 languages. If you find this app helpful then please consider making a donation at the website of studybuddhism.com to support their extensive efforts.';
    
    
LANG['en']={
  "App_Title":"Shantideva",
  "1:00":"1 am (1:00)",
  "2:00":"2 am (2:00)",
  "3:00":"3 am (3:00)",
  "4:00":"4 am (4:00)",
  "5:00":"5 am (5:00)",
  "6:00":"6 am (6:00)",
  "7:00":"7 am (7:00)",
  "8:00":"8 am (8:00)",
  "9:00":"9 am (9:00)",
  "10:00":"10 am (10:00)",
  "11:00":"11 am (11:00)",
  "12:00":"12 am (12:00)",
  "13:00":"1 pm (13:00)",
  "14:00":"2 pm (14:00)",
  "15:00":"3 pm (15:00)",
  "16:00":"4 pm (16:00)",
  "17:00":"5 pm (17:00)",
  "18:00":"6 pm (18:00)",
  "19:00":"7 pm (19:00)",
  "20:00":"8 pm (20:00)",
  "21:00":"9 pm (21:00)",
  "22:00":"10 pm (22:00)",
  "23:00":"11 pm (23:00)",
  "24:00":"12 pm (24:00)",   
  "Settings":"Set&shy;tings",
  
  "About_Text":'<div style="text-align:center"><p><img src="content/info-logo.png" style="max-width:90%" width="350" /></p><p>'
    + LANG_ABOUT_EN
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS,
  "App Language":"App Langu&shy;age",
  "Text Language":"Text Langu&shy;age",
  "Text Language 2":"Text Langu&shy;age&nbsp;2",
  "Text Language 3":"Text Langu&shy;age&nbsp;3"
}

LANG['ru']={
  "App_Title":"Шантидева",
  "Android App":"Android-приложение",
  "iOS App":"iOS-приложение",
  "Online App":"Веб приложение",
  "Verse of the Day":"آية اليوم",  
  "Verse of the Day":"Стих дня",
  "About":"Инфор&shy;мация",
  "Settings":"На&shy;строй&shy;ки",
  "Full Text":"Текст",
  "Chapter %1, Verse %2":"Глава %1, Стих %2",
  "About This App":"Об этом приложении",  
  "Jump to this verse in the text.":"Перейти к этому стиху.",
  "Language of Shantideva's text":"Язык текста Шантидевы",
  "You can show the text in up to three different languages at the same time in order to compare different translations.":"Вы можете отображать текст на нескольких языках одновременно, чтобы сравнить разные переводы.",
  "Text Language":"Язык текста",
  "Text Language 2":"Язык текста&nbsp;2",
  "Text Language 3":"Язык текста&nbsp;3",
  "Display Settings":"Конфи&shy;гу&shy;ра&shy;ция дисплея",
  "App Language":"Язык прило&shy;жения",
  "Font Size":"Размер шрифта",
  "Text color":"Цвет текста",
  "Black text on white background":"Черный текст, белый фон",
  "White text on black background":"Белый текст, черный фон",

  "Cancel":"Отмена",  
  "Save":"Сохранить",  
   "Notification Messages":"Уведомление",
    "Time":"Время",
    "Daily Message":"Ежедневное уведомление",
    "Show Messages":"Показать уведомления",
    "Enable the options below the see the verse of the day as a notification message.":"Если вы активируете следующие настройки, стихи дня будут отображаться как уведомление.", 
  "About_Text":'<div style="text-align:center"><p><img src="content/info-logo.png" style="max-width:90%" width="350" /></p><p>'
    + LANG_ABOUT_EN
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}



LANG['ar']={
  "App_Title":"شانتيديفا",
  "Android App":"الروبوت التطبيق",
  "iOS App":"تطبيق iOS",
  "Online App":"تطبيق ويب",
  "Verse of the Day":"آية اليوم",
  "About":"معلومات",
  "Settings":"الإعدادات",
  "Full Text":"النص الكامل",
  "Chapter %1, Verse %2":"الآية %2 من الفصل %1",
  "About This App":"حول هذا التطبيق",  
  "Jump to this verse in the text.":"تبين هذه الآية",
  "Language of Shantideva's text":"لغة نص شانتيديفا",
  "You can show the text in up to three different languages at the same time in order to compare different translations.":"يمكنك عرض النص بثلاث لغات مختلفة. مع هذا يمكنك مقارنة ترجمات مختلفة.",
  "Text Language":"لغة النص",
  "Text Language 2":"اللغة الثانية للنص",
  "Text Language 3":"اللغة الثالثة للنص",
  "Display Settings":"اعدادات العرض",
  "App Language":"لغة التطبيق",
  "Font Size":"حجم الخط",
  "Text color":"لون الخط",
  "Black text on white background":"نص أسود بخلفية بيضاء",
  "White text on black background":"نص أبيض بخلفية سوداء",

  "Cancel":"إلغاء",  
  "Save":"حفظ",  
   "Notification Messages":"إعدادات الإشعار",
    "Time":"زمن",
    "Daily Message":"إخطار يومي",
    "Show Messages":"مكين الإخطارات",
    "Enable the options below the see the verse of the day as a notification message.":"يمكنك تفعيل الخيارات أدناه لرؤية الآية اليومية كرسالة إخطار.", 
  "About_Text":'<div style="text-align:center"><p><img src="content/info-logo.png" style="max-width:90%" width="350" /></p><p>'
    + LANG_ABOUT_EN
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}


LANG['de']={
    "App_Title":"Shantideva",
    "Android App":"Android App",
    "iOS App":"iOS App",
    "Online App":"Online App",
    "Verse of the Day":"Vers des Tages",
    "About":"Über",
    "Settings":"Einstel&shy;lungen",
    "Full Text":"Gesamter Text",
    "Chapter %1, Verse %2":"Kapitel %1, Vers %2",
    "About This App":"Über diese App",
    "Jump to this verse in the text.":"Zu diesem Vers im Text springen",
    "Language of Shantideva's text":"Sprache für Shantideva's text",
    "Language of the App":"Sprache für Bedienelemente der App",
    "You can show the text in up to three different languages at the same time in order to compare different translations.":"Sie können den Text falls gewünscht in bis zu drei verschiedenen Sprachen anzeigen, um verschiedene Übersetzungen zu vergleichen.",
    "Text Language":"Text&shy;sprache",
    "Text Language 2":"Text&shy;spra&shy;che&nbsp;2",
    "Text Language 3":"Text&shy;spra&shy;che&nbsp;3",
    "Display Settings":"Anzeige-Einstel&shy;lungen",
    "App Language":"App-Sprache",
    "Font Size":"Schrift&shy;größe",
    "Text color":"Text&shy;farbe",
    "Black text on white background":"Weißer Text auf schwarzem Hintergrund",
    "White text on black background":"Schwarzer Text auf weißem Hintergrund",
    "Notification Messages":"Benachrichtigungen",
    "Time":"Uhrzeit",
    "Daily Message":"Tägl. Nachricht",
    "Show Messages":"Nachrichten anzeigen",
    "Enable the options below the see the verse of the day as a notification message.":"Aktivieren Sie die unten stehenden Optionen, um den Vers des Tages als Benachrichtigung angezeigt zu bekommen.",
    "Cancel":"Abbrechen",
    "Save":"Speichern",
    "About_Text":'<div style="text-align:center"><p><img src="content/info-logo.png" style="max-width:90%" width="350" /></p>'
    +'<p>Diese kleine App zeigt täglich einen Vers aus Shantideva\'s Text "Eintritt in das Verhalten eines Bodhisattvas" (Bodhisattvacharyavatara) und bietet Zugriff auf den gesamten Text.</p>'
    +'<p><strong><a href="https://studybuddhism.com/de/tibetischer-buddhismus/originaltexte/sutra-texte/eintritt-in-das-verhalten-eines-bodhisattvas/die-vorzuege-des-erleuchtungsgeistes" target="_blank" onclick="window.open(\'https://studybuddhism.com/de/tibetischer-buddhismus/originaltexte/sutra-texte/eintritt-in-das-verhalten-eines-bodhisattvas/die-vorzuege-des-erleuchtungsgeistes\',\'_system\');return false;">Dieser Text</a> und umfangreichere weitere Materialien sind verfügbar auf <a href="https://www.studybuddhism.com" target="_blank" onclick="window.open(\'https://www.studybuddhism.com\',\'_system\');return false;">studybuddhism.com</a></strong></p>'
    +'<p>Studybuddhism.com ist eine Website, die umfassendes buddhistisches Material Buddhism in vielen Sprachen zur Verfügung stellt. Falls Sie diese App hilfreich finden, dann erwägen Sie bitte eine Spende auf der Website von studybuddhism.com um dieses umfangreiche Projekt zu unterstützen.</p>'
    +LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}



LANG['bo']={
    "App_Title":"Shantideva",
    "Android App":"Android App",
    "iOS App":"iOS App",
    "Online App":"Online App",
    "Verse of the Day":"Vers des Tages",
    "About":"Über",
    "Settings":"Einstel&shy;lungen",
    "Full Text":"Gesamter Text",
    "Chapter %1, Verse %2":"Kapitel %1, Vers %2",
    "About This App":"Über diese App",
    "Jump to this verse in the text.":"Zu diesem Vers im Text springen",
    "Language of Shantideva's text":"Sprache für Shantideva's text",
    "Language of the App":"Sprache für Bedienelemente der App",
    "You can show the text in up to three different languages at the same time in order to compare different translations.":"Sie können den Text falls gewünscht in bis zu drei verschiedenen Sprachen anzeigen, um verschiedene Übersetzungen zu vergleichen.",
    "Text Language":"Text&shy;sprache",
    "Text Language 2":"Text&shy;spra&shy;che&nbsp;2",
    "Text Language 3":"Text&shy;spra&shy;che&nbsp;3",
    "Display Settings":"Anzeige-Einstel&shy;lungen",
    "App Language":"App-Sprache",
    "Font Size":"Schrift&shy;größe",
    "Text color":"Text&shy;farbe",
    "Black text on white background":"Weißer Text auf schwarzem Hintergrund",
    "White text on black background":"Schwarzer Text auf weißem Hintergrund",
    "Notification Messages":"Benachrichtigungen",
    "Time":"Uhrzeit",
    "Daily Message":"Tägl. Nachricht",
    "Show Messages":"Nachrichten anzeigen",
    "Enable the options below the see the verse of the day as a notification message.":"Aktivieren Sie die unten stehenden Optionen, um den Vers des Tages als Benachrichtigung angezeigt zu bekommen.",
    "Cancel":"Abbrechen",
    "Save":"Speichern",
}
