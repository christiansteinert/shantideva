/*
simplified Chinese:
"Chinese Translation": 中文翻译
Text title: 入菩萨行论
Shantideva: 寂天菩萨
"Translated by master Jiqun": 如石法师译

Chinese Translation by Master Jiqun  / 如石法师 (www.putishuyuan.com , www.bodhiacademy.org)

http://www.putishuyuan.com/index.php?app=@article&ac=show&id=13409
 */

/* 
traditional Chinese
"Chinese Translation": 中文翻譯

Text title: 入菩薩行論 

Shantideva:寂天菩薩  
"Translated by master Jiqun": 如石法師譯

http://www.putishuyuan.com/index.php?app=@article&ac=show&id=13409
*/


var TEXT_LANG_LIST={
    'en':'English',
    'ar':'العربية (Arabic)',
    'de':'Deutsch (German)',
    //'es':' Español (Spanish)',
    'nl':'Nederlands (Dutch)',
    //'pt','Português (Portuguese)'
    'ru':'Русский (Russian)',
    'zh-cn':'简体中文 (Simplified Chinese)',
    'zh-tw':'繁體中文 (Traditional Chinese)',
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
    //'es':' Español (Spanish)',
    'nl':'Nederlands (Dutch)',
    //'pt','Português (Portuguese)'
    'ru':'Русский (Russian)',
    'bo':'བོད་ཡིག་ (Tibetan)',
    'zh-cn':'简体中文 (Simplified Chinese)',
    'zh-tw':'繁體中文 (Traditional Chinese)'
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
    +'<li>Dutch tranlation by Hans van den Bogaert. Gepubliceerd met vriendelijke toestemming van Maitreya Instituut. Een gedrukte editie van deze vertaling is verkrijgbaar bij boeddhaboeken.nl</li>'
    +'<li>Chinese translation by master Jiqun / 如石法师译 / 如石法師譯. '
    +'<a href="https://www.putishuyuan.com" target="_blank" onclick="window.open(\'https://www.putishuyuan.com\',\'_system\');return false;">www.putishuyuan.com</a>, '
    +'<a href="https://www.bodhiacademy.org" target="_blank" onclick="window.open(\'https://www.bodhiacademy.org\',\'_system\');return false;">www.bodhiacademy.org</a>'
    +'</li>'
    +'<li>Sanskrit edition: Mahoney, Richard, transcriber, Bodhicaryāvatāra of Śāntideva: Sanskrit text (Oxford, North Canterbury: Indica et Buddhica, 2003); '
    +'<a href="https://indica-et-buddhica.org" target="_blank" onclick="window.open(\'https://indica-et-buddhica.org\',\'_system\');return false;">indica-et-buddhica.org</a>, '
    +'</li>'
    +'</ul></p>';
    
var LANG_ABOUT_EN = 'This App displays one verse a day from Shantideva\'s Buddhist text "Engaging in Bodhisattva Behavior" (Bodhisattvacharyavatara) and allows to read through the entire text. '
    +'"Engaging in Bodhisattva Behavior" is an outstandingly practical and inspiring text that covers all the aspects of the Buddhist path. '
    +'Shantideva was a great Indian master who lived during the 8th century CE. Two of his texts survive - the Bodhicharyavatara (the text that is displayed in this app) and the '
    +'Shikshasamuccaya ("Compendium of Trainings"). Both texts are still used to the present day by and especially the Bodhicharyavatara is one of the most cherished and most frequently taught ' 
    +'texts in the Tibetan tradition.'
    +'</p>'
    +'<p><strong>You can find '
    +'<a href="https://studybuddhism.com/en/tibetan-buddhism/original-texts/sutra-texts/engaging-in-bodhisattva-behavior/the-benefits-of-bodhichitta" target="_blank" onclick="window.open(\'https://studybuddhism.com/en/tibetan-buddhism/original-texts/sutra-texts/engaging-in-bodhisattva-behavior/the-benefits-of-bodhichitta\',\'_system\');return false;">'
    +'this text'
    +'</a> '
    +'and much more Buddhist material in many languages at: '
    +'<a href="https://studybuddhism.com" target="_blank" onclick="window.open(\'https://studybuddhism.com\',\'_system\');return false;">'
    +'studybuddhism.com'
    +'</a></strong></p>'
    +'<p>'
    +'Studybuddhism.com is a website that makes comprehensive material about Buddhism available in 31 languages. If you find this app helpful then please consider making a donation at the website of studybuddhism.com to support their extensive efforts.';
    
LOGO='<p><img src="content/info-logo.png" style="max-width:90%" width="350" /><br/><a href="https://www.shantideva.com/" target="_blank" onclick="window.open(\'https://www.shantideva.com\',\'_system\');return false;"><strong>www.shantideva.com</strong></a></p><hr />';
    
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
  
  "About_Text":'<div style="text-align:center"  lang="en" class="en">'+LOGO+'<p>'
    + LANG_ABOUT_EN
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS,
  "Verse of the Day":"Verse&nbsp;of the&nbsp;Day",    
  "App Language":"App Langu&shy;age",
  "Text Language":"Text Langu&shy;age",
  "Text Language 2":"Text Langu&shy;age&nbsp;2",
  "Text Language 3":"Text Langu&shy;age&nbsp;3"
}



LANG_ABOUT_RU = 'Приложение каждый день показывает по одной строфе из текста Шантидевы «Вступая на путь поведения бодхисаттвы» («Бохисаттва-чарья-аватара»), а также в нём можно прочитать весь текст. «Вступая на путь поведения бодхисаттвы» – крайне практичный и вдохновляющий буддийский текст, в котором рассматриваются все аспекты буддийского пути. Шантидева был выдающимся индийским буддийским мастером 8-го века. Сохранились два его текста – «Бодхичарья-аватара», которому посвящено это приложение, и «Шикша-самуччая» («Собрание практик»). Оба текста по-прежнему широко используются, особенно «Бодхичарья-аватара», ставший одним из самых ценных и часто преподаваемых текстов тибетской традиции.'
    +'</p>'
    +'<p lang="ru" class="ru"><strong>Вы можете найти '
    +'<a href="https://studybuddhism.com/ru/tibetskiy-buddizm/klassicheskie-teksty/teksty-sutry/vstupaya-na-put-povedeniya-bodhisattvy" target="_blank" onclick="window.open(\'https://studybuddhism.com/ru/tibetskiy-buddizm/klassicheskie-teksty/teksty-sutry/vstupaya-na-put-povedeniya-bodhisattvy\',\'_system\');return false;">'
    +'этот текст'
    +'</a> '
    +'и много других материалов о буддизме на множестве языков на сайте: '
    +'<a href="https://studybuddhism.com/ru" target="_blank" onclick="window.open(\'https://studybuddhism.com/ru\',\'_system\');return false;">'
    +'studybuddhism.com'
    +'</a></strong></p>'
    +'<p lang="ru" class="ru">'
    +'Studybuddhism.com – портал, посвящённый всестороннему изучению буддизма и доступный на 31 языке. Если это приложение показалось вам полезным, пожалуйста, рассмотрите возможность пожертвования на нужды сайта studybuddhism.com, чтобы поддержать его работу.';

LANG['ru']={
"App_Title":"Шантидева",
"Android App":"Версия для Android",
"iOS App":"Версия для iOS",
"Online App":"Онлайн-версия",
"Verse of the Day":"Строфа дня",
"About":"О нас",
"Settings":"Настройки",
"Full Text":"Весь текст",
"Chapter %1, Verse %2":"Глава %1, строфа %2",
"About This App":"О приложении",
"Jump to this verse in the text.":"Перейти к этой строфе",
"Language of Shantideva's text":"Язык текста Шантидевы",
"Language of the App":"Язык приложения",
"You can show the text in up to three different languages at the same time in order to compare different translations.":"Вы можете включить до трёх языков одновременно, чтобы сравнить разные переводы.",
"Text Language":"Язык текста",
"Text Language 2":"Язык текста 2",
"Text Language 3":"Язык текста 3",
"Display Settings":"Показать настройки",
"App Language":"Язык приложения",
"Font Size":"Размер шрифта",
"Text color":"Цвет текста",
"Black text on white background":"Чёрный текст на белом фоне",
"White text on black background":"Белый текст на чёрном фоне",
"Notification Messages":"Оповещения",
"Time":"Время",
"Daily Message":"Ежедневное оповещение",
"Show Messages":"Показать оповещения",
"Enable the options below to see the verse of the day as a notification message.":"Включите эту опцию, чтобы ежедневно получать одну строфу в виде оповещения.",
"You need to be online when you save the notification settings.":"Чтобы сохранить настройки оповещения, нужно быть онлайн.",
"Notifications can only be displayed you when you are online.":"Оповещения отображаются, только когда вы онлайн.",
"Favorite Verses":"Избранные строфы",
"Mark verse as favorite":"Добавить к избранным строфам",
"This verse was marked as a favorite":"Эта строфа была добавлена в избранное",
"This verse was removed from your favorites":"Эта строфа была удалена из избранного",
"Cancel":"Отменить",
"Save":"Сохранить",
"Historical Context of Shantideva's life":"Исторический контекст жизни Шантидевы",
"Historical Context":"Исторический контекст",
"Translations & Commentaries":"Перевод и комментарии",
"Shantideva Translations":"Переводы Шантидевы",
"Commentaries on Shantideva":"Комментарии к текстам Шантидевы",
  
  "About_Text":'<div style="text-align:center" lang="ru" class="ru">'+LOGO+'<p lang="ru" class="ru">'
    + LANG_ABOUT_RU
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}





LANG_ABOUT_ZH_CN = '这个应用程序每天从 寂天菩萨(Shantideva)的文本“入菩薩行論”（Bodhisattvacharyavatara）中显示一节经文，并允许阅读全文。 “参与菩萨行为”是一本非常实用且鼓舞人心的佛教经文，涵盖了佛教之路的所有方面。 寂天菩萨(Shantideva)是一位伟大的印度大师，生于公元8世纪。他的两个文本得以保存- “入菩薩行論”(Bodhicharyavatara, 此应用程序中显示的文本）和“ 大乘集菩萨学论”（Shikshasamuccaya）。两种文字至今仍被人们使用，特别是菩提心经是藏族传统中最珍贵，最常传授的文字之一';

LANG['zh-cn']={
"App_Title":"寂天菩萨",
"Android App":"Android程序（App）",
"iOS App":"IOS程序（App）",
"Online App":"在线程序 （App）",
"Verse of the Day":"今日经文",
"About":"关于",
"Settings":"设置",
"Full Text":"全文",
"Chapter %1, Verse %2":"第%1章，第%2节 ",
"About This App":"关于应用程序",
"Jump to this verse in the text.":"跳至这段经文",
"Language of Shantideva's text":"寂天菩萨经文的语言选择",
"Language of the App":"程序语言",
"You can show the text in up to three different languages at the same time in order to compare different translations.":"您可以同时以三种不同的语言显示文本，以便比较不同的翻译",
"Text Language":"文字语言一",
"Text Language 2":"文字语言二",
"Text Language 3":"文字语言三",
"Display Settings":"屏幕设置",
"App Language":"程序语言",
"Font Size":"字体大小",
"Text color":"字体颜色",
"Black text on white background":"黑字白底",
"White text on black background":"白字黑底",
"Notification Messages":"提醒通知（信息）",
"Time":"时间",
"Daily Message":"每日信息",
"Show Messages":"显示信息",
"Enable the options below to see the verse of the day as a notification message.":"启用显示“今日经文”为提醒通知选项",
"You need to be online when you save the notification settings.":"您必须在线提醒通知设置",
"Notifications can only be displayed you when you are online.":"提醒通知只有在线时显示",
"Favorite Verses":"收藏经文",
"Mark verse as favorite":"标记为收藏经文",
"This verse was marked as a favorite":"经文已经标记为收藏",
"This verse was removed from your favorites":"这段经文已经删除收藏标记",
"Cancel":"取消",
"Save":"保存",
"Historical Context of Shantideva's life":"寂天菩萨一生的历史记叙（背景）",
"Historical Context":"历史背景",
"Translations & Commentaries":"广译与评论",
"Shantideva Translations":"寂天菩萨广译",
"Commentaries on Shantideva":"寂天菩萨经文的评论",
  
  "About_Text":'<div style="text-align:center" lang="zh-CN" class="zh">'+LOGO+'<p lang="zh-CN" class="zh">'
    + LANG_ABOUT_ZH_CN
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}



LANG_ABOUT_ZH_TW = '這個應用程序每天從 寂天菩薩(Shantideva)的文本“入菩薩行論”（Bodhisattvacharyavatara）中顯示一節經文，並允許閱讀全文。 “參與菩薩行為”是一本非常實用且鼓舞人心的佛教經文，涵蓋了佛教之路的所有方面。寂天菩薩(Shantideva)是一位偉大的印度大師，生於公元8世紀。他的兩個文本得以保存- “入菩薩行論”(Bodhicharyavatara, 此應用程序中顯示的文本）和“ 大乘集菩薩學論”（Shikshasamuccaya）。兩種文字至今仍被人們使用，特別是菩提心經是藏族傳統中最珍貴，最常傳授的文字之一';

LANG['zh-tw']={
"App_Title":"寂天菩薩",
"Android App":"Android程序（App）",
"iOS App":"IOS程序（App）",
"Online App":"在線程序 （App）",
"Verse of the Day":"今日經文",
"About":"關於",
"Settings":"設置",
"Full Text":"全文",
"Chapter %1, Verse %2":"第%1章，第%2節 ",
"About This App":"關於應用程序",
"Jump to this verse in the text.":"跳至這段經文",
"Language of Shantideva's text":"寂天菩薩經文的語言選擇",
"Language of the App":"程序語言",
"You can show the text in up to three different languages at the same time in order to compare different translations.":"您可以同時以三種不同的語言顯示文本，以便比較不同的翻譯",
"Text Language":"文字語言一",
"Text Language 2":"文字語言二",
"Text Language 3":"文字語言三",
"Display Settings":"屏幕設置",
"App Language":"程序語言",
"Font Size":"字體大小",
"Text color":"字體顏色",
"Black text on white background":"黑字白底",
"White text on black background":"白字黑底",
"Notification Messages":"提醒通知（信息）",
"Time":"時間",
"Daily Message":"每日信息",
"Show Messages":"顯示信息",
"Enable the options below to see the verse of the day as a notification message.":"啟用顯示“今日經文”為提醒通知選項",
"You need to be online when you save the notification settings.":"您必須在線提醒通知設置",
"Notifications can only be displayed you when you are online.":"提醒通知只有在線時顯示",
"Favorite Verses":"收藏經文",
"Mark verse as favorite":"標記為收藏經文",
"This verse was marked as a favorite":"經文已經標記為收藏",
"This verse was removed from your favorites":"這段經文已經刪除收藏標記",
"Cancel":"取消",
"Save":"保存",
"Historical Context of Shantideva's life":"寂天菩薩一生的歷史記敘（背景）",
"Historical Context":"歷史背景",
"Translations & Commentaries":"廣譯與評論",
"Shantideva Translations":"寂天菩薩廣譯",
"Commentaries on Shantideva":"寂天菩薩經文的評論",
  
  "About_Text":'<div style="text-align:center" lang="zh-TW" class="zh">'+LOGO+'<p lang="zh-TW" class="zh">'
    + LANG_ABOUT_ZH_TW
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}


LANG_ABOUT_PT = 'Este aplicativo exibe um verso por dia do texto de Shantideva "Engajando-se no Comportamento do Bodhisattva" (Bodhisattvacharyavatara) e permite a leitura de todo o texto. "Engajando-se no Comportamento do Bodhisattva" (alt. O Caminho do Bodisatva) é um texto extremamente prático e inspirador que cobre todos os aspectos do caminho budista. Shantideva foi um grande mestre indiano que viveu durante o século VIII dC. Dois de seus textos sobreviveram - o Bodhicharyavatara (exibido neste aplicativo) e o Shikshasamuccaya ("Compêndio de Treinamentos"). Ambos são usados até hoje, e e o Bodhicharyavatara é um dos textos mais estimados e mais ensinados na tradição tibetana.'
    +'</p>'
    +'<p lang="pt" class="pt"><strong>Você encontra '
    +'<a href="https://studybuddhism.com/pt/budismo-tibetano/textos-originais/textos-dos-sutras/engajando-se-no-comportamento-de-um-bodhisattva" target="_blank" onclick="window.open(\'https://studybuddhism.com/pt/budismo-tibetano/textos-originais/textos-dos-sutras/engajando-se-no-comportamento-de-um-bodhisattva\',\'_system\');return false;">'
    +'este'
    +'</a> '
    +'e muitos outros textos em : '
    +'<a href="https://studybuddhism.com/pt" target="_blank" onclick="window.open(\'https://studybuddhism.com/pt\',\'_system\');return false;">'
    +'studybuddhism.com'
    +'</a></strong>, em diversos idiomas.</p>'
    +'<p lang="pt" class="pt">'
    +'Studybuddhism.com é um site que disponibiliza um vasto material sobre budismo em 31 idiomas. Se você achar este aplicativo útil, por favor, considere fazer uma doação no site studybuddhism.com para apoiar nossos extensos esforços.';

LANG['pt']={
"App_Title":"Shantideva",
"Android App":"App Android",
"iOS App":"App iOS",
"Online App":"App Online",
"Verse of the Day":"Verso do Dia",
"About":"Sobre",
"Settings":"Configurações",
"Full Text":"Texto Completo",
"Chapter %1, Verse %2":"Capítulo %1, Verso %2",
"About This App":"Sobre este App",
"Jump to this verse in the text.":"Vá para este verso no texto",
"Language of Shantideva's text":"Idioma do texto de Shantideva",
"Language of the App":"Idioma do App",
"You can show the text in up to three different languages at the same time in order to compare different translations.":"Você pode visualizar o texto em até três idiomas diferentes ao mesmo tempo a fim de comparar as traduções.",
"Text Language":"Idioma do Texto",
"Text Language 2":"Idioma do Texto 2",
"Text Language 3":"Idioma do Texto 3",
"Display Settings":"Mostrar Configurações",
"App Language":"Idioma do App",
"Font Size":"Tamanho da Fonte",
"Text color":"Cor do Texto",
"Black text on white background":"Texto preto em fundo branco",
"White text on black background":"Texto branco em fundo preto",
"Notification Messages":"Notificações",
"Time":"Hora",
"Daily Message":"Mensagem Diária",
"Show Messages":"Mostrar Mensagens",
"Enable the options below to see the verse of the day as a notification message.":"Habilite as opções abaixo para receber como notificação o verso do dia.",
"You need to be online when you save the notification settings.":"Você precisa estar online para salvar as configurações de notificações.",
"Notifications can only be displayed you when you are online.":"As notificações só são exibidas quando você está online",
"Favorite Verses":"Versos Favoritos",
"Mark verse as favorite":"Marcar verso como favorito",
"This verse was marked as a favorite":"Este verso foi marcado como favorito",
"This verse was removed from your favorites":"Este verso foi removido dos favoritos",
"Cancel":"Cancelar",
"Save":"Salvar",
"Historical Context of Shantideva's life":"Contexto histórico da vida de Shantideva",
"Historical Context":"Contexto Histórico",
"Translations & Commentaries":"Traduções e Comentários",
"Shantideva Translations":"Traduções de Shantideva",
"Commentaries on Shantideva":"Comentários sobre Shantideva",
  
  "About_Text":'<div style="text-align:center" lang="pt" class="pt">'+LOGO+'<p lang="pt" class="pt">'
    + LANG_ABOUT_PT
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}




LANG_ABOUT_ES = 'Esta App muestra un verso cada día del texto de Shantideva “Involucrarse en el comportamiento del bodisatva” (Bodhisattvacharyavatara) y permite la lectura del texto completo. “Involucrarse en el comportamiento del bodisatva” es un texto budista increíblemente práctico e inspirador que cubre todos los aspectos del camino budista. Shantideva fue un gran maestro budista indio que vivió durante el siglo VIII e. c. Sobreviven dos de sus textos: el Bodhicharyavatara (el texto que se muestra en esta app) y el Shikshasamuccaya (“Compendio de entrenamientos”). Ambos textos han seguido en uso hasta el presente, en especial el Bochicharyavatara, que es uno de los textos de la tradición tibetana más atesorados y más frecuentemente usados en las enseñanzas.'
    +'</p>'
    +'<p lang="es" class="es"><strong>Se puede encontrar '
    +'<a href="https://studybuddhism.com/en/tibetan-buddhism/original-texts/sutra-texts/engaging-in-bodhisattva-behavior" target="_blank" onclick="window.open(\'https://studybuddhism.com/en/tibetan-buddhism/original-texts/sutra-texts/engaging-in-bodhisattva-behavior\',\'_system\');return false;">'
    +'este texto'
    +'</a> '
    +'y muchos más materiales budistas en diversos idiomas en:: '
    +'<a href="https://studybuddhism.com/es" target="_blank" onclick="window.open(\'https://studybuddhism.com/es\',\'_system\');return false;">'
    +'studybuddhism.com'
    +'</a></strong></p>'
    +'<p lang="es" class="es">'
    +'Studybuddhism.com es un sitio web que pone a su disposición material completo sobre budismo en 31 idiomas. Si encuentra útil esta app, por favor considere la posibilidad de hacer una donación al sitio web studybuddhism.com como apoyo a sus vastos esfuerzos.';

LANG['es']={
"App_Title":"Shantideva",
"Android App":"Android App",
"iOS App":"iOS App",
"Online App":"App en línea",
"Verse of the Day":"Verso del día",
"About":"Tema",
"Settings":"Configuración",
"Full Text":"Texto completo",
"Chapter %1, Verse %2":"Capítulo %1, verso %2",
"About This App":"Sobre esta App",
"Jump to this verse in the text.":"Saltar a este verso en el texto.",
"Language of Shantideva's text":"Idioma del texto de Shantideva",
"Language of the App":"Idioma de la App",
"You can show the text in up to three different languages at the same time in order to compare different translations.":"Puede mostrar el texto hasta en tres idiomas diferentes al mismo tiempo para comparar las diferentes traducciones.",
"Text Language":"Idioma del texto",
"Text Language 2":"Idioma del texto 2",
"Text Language 3":"Idioma del texto 3",
"Display Settings":"Configuración de pantalla",
"App Language":"Idioma de la App",
"Font Size":"Tamaño de la tipografía",
"Text color":"Color del texto",
"Black text on white background":"Texto negro sobre fondo blanco",
"White text on black background":"Texto blanco sobre fondo negro",
"Notification Messages":"Mensajes de notificación",
"Time":"Tiempo",
"Daily Message":"Mensaje diario",
"Show Messages":"Mostrar mensajes",
"Enable the options below to see the verse of the day as a notification message.":"Habilite las siguientes opciones para ver el verso del día como un mensaje de notificación ",
"You need to be online when you save the notification settings.":"Es necesario estar en línea para guardar los ajustes de notificación",
"Notifications can only be displayed you when you are online.":"Las notificaciones solo pueden mostrarse cuando se está en línea",
"Favorite Verses":"Versos favoritos",
"Mark verse as favorite":"Marcar verso como favorito",
"This verse was marked as a favorite":"Este verso se marcó como favorito",
"This verse was removed from your favorites":"Este verso fue borrado de los favoritos",
"Cancel":"Cancelar",
"Save":"Guardar",
"Historical Context of Shantideva's life":"Contexto histórico de la vida de Shantideva",
"Historical Context":"Contexto histórico",
"Translations & Commentaries":"Traducciones y comentarios",
"Shantideva Translations":"Traducciones de Shantideva",
"Commentaries on Shantideva":"Comentarios sobre Shantideva",

  "About_Text":'<div style="text-align:center" lang="es" class="es">'+LOGO+'<p lang="es" class="es">'
    + LANG_ABOUT_ES
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}




LANG_ABOUT_NL = 'Deze app toont één vers per dag uit Shantideva\'s tekst “Het pad van de bodhisattva-krijger” (Bodhisattvacharyavatara) en maakt het mogelijk om de hele tekst door te lezen. “Het pad van de bodhisattva-krijger” is een buitengewoon praktische en inspirerende boeddhistische tekst die alle aspecten van het boeddhistische pad bestrijkt. Shantideva was een grote Indiase boeddhistische meester die leefde in de 8e eeuw na Christus. Twee van zijn teksten zijn bewaard gebleven - de Bodhicharyavatara (de tekst die in deze app wordt weergegeven) en de Shikshasamuccaya (“Compendium van Trainingen”). Beide teksten worden tot op de dag van vandaag nog gebruikt en vooral de Bodhicharyavatara is een van de meest gekoesterde en meest onderwezen teksten in de Tibetaanse traditie.'
    +'</p>'
    +'<p lang="nl" class="nl">Nederlandse versie vertaald door Hans van den Bogaert. Gepubliceerd met vriendelijke toestemming van '
    +'<a href="https://www.maitreya.nl/" target="_blank" onclick="window.open(\'https://www.maitreya.nl/\');return false;">Maitreya Instituut</a>. '
    +'Een gedrukte editie van deze vertaling is verkrijgbaar bij <a href="https://www.boeddhaboeken.nl/pad-van-de-bodhisattva-krijger"  target="_blank" onclick="window.open(\'https://www.boeddhaboeken.nl/pad-van-de-bodhisattva-krijger\');return false;">boeddhaboeken.nl</a>.<hr />'
    +'<p>You can find a lot of Buddhist material in many languages at: '
    +'<a href="https://studybuddhism.com" target="_blank" onclick="window.open(\'https://studybuddhism.com\',\'_system\');return false;">'
    +'studybuddhism.com'
    +'</a></p>'
    +'<p>'
    +'Studybuddhism.com is a website that makes comprehensive material about Buddhism available in 31 languages. If you find this app helpful then please consider making a donation at the website of studybuddhism.com to support their extensive efforts.';

LANG['nl']={
    "Translation_Credit": 'Nederlandse versie vertaald door Hans van den Bogaert. Gepubliceerd met vriendelijke toestemming van '
    +'<a href="https://www.maitreya.nl/" target="_blank" onclick="window.open(\'https://www.maitreya.nl/\');return false;">Maitreya Instituut</a>. '
    +'Een gedrukte editie van deze vertaling is verkrijgbaar bij <a href="https://www.boeddhaboeken.nl/pad-van-de-bodhisattva-krijger"  target="_blank" onclick="window.open(\'https://www.boeddhaboeken.nl/pad-van-de-bodhisattva-krijger\');return false;">boeddhaboeken.nl</a>.',
	"App_Title": "Shantideva",
	"Shantideva App": "Shantideva-app",
	"Android App": "Android-app",
	"iOS App": "iOS-app",
	"Online App": "Online App",
	"Verse of the Day": "Vers van de dag",
	"About": "Over ",
	"Settings": "Instellingen",
	"Full Text": "Volledige tekst",
	"Chapter %1, Verse %2": "Hoofdstuk %1, Vers %2",
	"About This App": "Over deze app",
	"Jump to this verse in the text.": "Spring naar dit vers in de tekst.",
	"Language of Shantideva's text": "Taal van Shantideva's tekst",
	"Language of the App": "Taal van de App",
	"You can show the text in up to three different languages at the same time in order to compare different translations.": "U kunt de tekst in maximaal drie verschillende talen tegelijk weergeven om verschillende vertalingen te vergelijken.",
	"Text Language": "Tekst taal",
	"Text Language 2": "Tekst taal 2",
	"Text Language 3": "Tekst taal 3",
	"Display Settings": "Weergave-instellingen",
	"App Language": "Taal van de app",
	"Font Size": "Lettergrootte",
	"Text color": "Tekstkleur",
	"Black text on white background": "Zwarte tekst op witte achtergrond",
	"White text on black background": "Witte tekst op zwarte achtergrond",
	"Notification Messages": "Berichten met meldingen",
	"Time": "Tijd",
	"Daily Message": "Dagelijks bericht",
	"Show Messages": "Berichten weergeven",
	"Enable the options below the see the verse of the day as a notification message.": "Schakel de onderstaande opties in om het vers van de dag als een meldingsbericht te bekijken.",
	"You need to be online when you save the notification settings.": "U moet online zijn wanneer u de meldingsinstellingen opslaat.",
	"Notifications can only be displayed you when you are online.": "Meldingen kunnen alleen worden weergegeven als u online bent.",
	"Favorite Verses": "Favoriete verzen",
	"Mark verse as favorite": "Markeer vers als favoriet",
	"This verse was marked as a favorite": "Dit vers werd gemarkeerd als een favoriet",
	"This verse was removed from your favorites": "Dit vers is verwijderd uit uw favorieten",
	"Cancel": "Annuleren",
	"Save": "Bewaren",

  "About_Text":'<div style="text-align:center" lang="nl" class="nl">'+LOGO+'<p lang="nl" class="nl">'
    + LANG_ABOUT_NL
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}






LANG_ABOUT_AR = '<span dir="rtl" class="ar" lang="ar">هذا التطبيق يعرض بيتًا واحدًا في اليوم من نَص شانتيديفا "الانخراط في سلوك البوديساتفا" (بوديساتفاتشارياأفاتارا) ويُتيح لكم قراءة النَّص بأكمله. نص "الانخراط في سلوك البوديساتفا" هو نص بوذي عملي وملهم بشكل استثنائي، يُغطي جميع جوانب المسار البوذي. كان شانتيديفا معلمًا بوذيًا هنديًا عظيمًا، عاش خلال القرن الثامن الميلادي. نَصان له نجيا – البوديساتفاتشارياأفاتارا (النَّص المعروض في هذا التطبيق) ونَص الشيكشاساموكايا ("مُلخَّص التدريبات"). كلا النَّصين ما يزالا يُستخدمان حتى يومنا هذا، وخاصة البوديساتفاتشارياأفاتارا الذي يُعَد واحد من أكثر النصوص الذي يُعتَزّ بها ويتم تدريسها في التقليد التبتي.'
    +'</span></p>'
    +'<p dir="rtl" class="ar" lang="ar"><strong>بإمكانكم العثور على هذا النَّص والمزيد من المواد البوذية بعدة لغات على موقع: '
    +'<a href="https://studybuddhism.com/ar/albwdhyt-altbtyt/alnsws-alaslyt/nsws-alswtra/alankhrat-fy-slwk-albwdysatfa" target="_blank" onclick="window.open(\'https://studybuddhism.com/ar/albwdhyt-altbtyt/alnsws-alaslyt/nsws-alswtra/alankhrat-fy-slwk-albwdysatfa\',\'_system\');return false;">'
    +'</a>.'
    +'</strong></p>'
    +'<p dir="rtl" class="ar" lang="ar">'
    +'studybuddhism.com، هو موقع إلكتروني يوفر مادة شاملة عن البوذية، متاحة بـ31 لغة. إذا وجدتم هذا التطبيق مفيدًا، فرجاءً مشكورين تقديم تبرع على الموقع الإلكتروني studybuddhism.com؛ لدعم جهودهم المُكثفة.';

LANG['ar']={
  "App_Title":"شانتيديفا",
  "Android App":"تطبيق الأندرويد",
  "iOS App":"تطبيق الآيفون",
  "Online App":"التطبيق عبر الإنترنت",
  "Verse of the Day":"بيت اليوم",
  "About":"عن",
  "Settings":"الإعدادات",
  "Full Text":"النَّص الكامل",
  "Chapter %1, Verse %2":"الفصل %1، البيت %2",
  "About This App":"عن هذا التطبيق",
  "Jump to this verse in the text.":"الانتقال إلى هذا البيت من النَّص",
  "Language of Shantideva's text":"لغة نَص شانتيديفا",
  "Language of the App":"لغة التطبيق",
  "You can show the text in up to three different languages at the same time in order to compare different translations.":"بالإمكان عرض النَّص بثلاث لغات مختلفة في الوقت نفسه لمقارنة الترجمات المتنوعة",
  "Text Language":"لغة النَّص",
  "Text Language 2":"لغة النَّص 2",
  "Text Language 3":"لغة النَّص 3",
  "Display Settings":"إعدادات العرض",
  "App Language":"لغة التطبيق",
  "Font Size":"حجم الحروف",
  "Text color":"لون النَّص",
  "Black text on white background":"نَص أسود بخلفية بيضاء",
  "White text on black background":"نَص أبيض بخلفية سوداء",
  "Notification Messages":"رسائل الإشعارات",
  "Time":"الوقت",
  "Daily Message":"الرسالة اليومية",
  "Show Messages":"عرض الرسائل",
  "Enable the options below to see the verse of the day as a notification message.":"السماح بالخيارات أدناه لرؤية بيت اليوم في رسائل الإشعارات.",
  "You need to be online when you save the notification settings.":"يجب أن تكون متصل بالإنترنت لحفظ إعدادات الإشعارات.",
  "Notifications can only be displayed you when you are online.":"يتم عرض الإشعارات فقط عندما تكون متصلًا بالإنترنت",
  "Favorite Verses":"الأبيات المُفضلة",
  "Mark verse as favorite":"حدِّد البيت في المفضلة",
  "This verse was marked as a favorite":"هذا البيت تم تحديده في المفضلة",
  "This verse was removed from your favorites":"هذا البيت تم حذفه من المفضلة",
  "Cancel":"إلغاء",
  "Save":"حفظ",
  "Historical Context of Shantideva's life":"السياق التاريخي لحياة شانتيديفا",
  "Historical Context":"السياق التاريخي",
  "Translations & Commentaries":"ترجمات وشروحات",
  "Shantideva Translations":"ترجمات شانتيديفا",
  "Commentaries on Shantideva":"شروحات لنَص شانتيديفا",
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
    
  "About_Text":'<div style="text-align:center"  lang="ar" class="ar">'+LOGO+'<p lang="ar" class="ar">'
    + LANG_ABOUT_AR
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
    "Verse of the Day":"Vers&nbsp;des Tages",
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
    "Favorite Verses":"Lieblingsverse",
    "Enable the options below to see the verse of the day as a notification message.":"Aktivieren Sie die unten stehenden Optionen, um den Vers des Tages als Benachrichtigung angezeigt zu bekommen.",
    "You need to be online when you save the notification settings.":"Sie müssen online sein, um die Benachrichtigungseinstellungen zu speichern.",
    "Notifications can only be displayed you when you are online.":"Benachrichtigungen werden nur angezeigt, während Sie online sind.",
    "Cancel":"Abbrechen",
    "Save":"Speichern",
    "About_Text":'<div style="text-align:center" lang="de" class="de">'+LOGO+'</p>'
    +'<p lang="de" class="de">Diese App zeigt täglich einen Vers aus Shantideva\'s buddhistischem Text "Eintritt in das Verhalten eines Bodhisattvas" (Bodhisattvacharyavatara) und bietet Zugriff auf den gesamten Text. Dieser inspirierede und überaus praktische Text beleuchtet alle Aspekte des buddhistischen Pfades.'
    +'Shantideva war ein großer buddhistischer Meister, der während des 8. Jahrhunderts unserer Zeitrechnung in Indien lebte. Zwei seiner Texte sind erhalten geblieben - das Bodhicharyavatara (der Text, welcher in dieser App enthalten ist) sowie das '
    +'Shikshasamuccaya ("Kompendium der Schulungen"). Beide Texte werden bis zum heutigen Tag gelesen und studiert und insbesondere das Bodhicharyavatara ist einer der am häufigsten gelehrten ' 
    +'Texte innerhalb der tibetisch-buddhistischen Tradition.'
    +'</p>'
    +'<p lang="de" class="de"><strong><a href="https://studybuddhism.com/de/tibetischer-buddhismus/originaltexte/sutra-texte/eintritt-in-das-verhalten-eines-bodhisattvas/die-vorzuege-des-erleuchtungsgeistes" target="_blank" onclick="window.open(\'https://studybuddhism.com/de/tibetischer-buddhismus/originaltexte/sutra-texte/eintritt-in-das-verhalten-eines-bodhisattvas/die-vorzuege-des-erleuchtungsgeistes\',\'_system\');return false;">Dieser Text</a> und umfangreichere weitere Materialien sind in zahlreichen Sprachen auf <a href="https://studybuddhism.com/de" target="_blank" onclick="window.open(\'https://studybuddhism.com/de\',\'_system\');return false;">studybuddhism.com</a> verfügbar.</strong></p>'
    +'<p lang="de" class="de">Studybuddhism.com ist eine Website, die umfassendes buddhistisches Material Buddhism in 31 verschiedenen Sprachen zur Verfügung stellt. Falls Sie diese App hilfreich finden, dann erwägen Sie bitte eine Spende auf der Website von studybuddhism.com um dieses umfangreiche Projekt zu unterstützen.</p>'
    +LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}




LANG_ABOUT_BO= 'བཀོལ་སྤྱོད་མཉེན་ཆས་འདིས་སློབ་དཔོན་ཆེན་པོ་ཞི་བ་ལྷས་མཛད་པའི་ “བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ་”ཞེས་པའི་གཞུང་ནས་ཉིན་རེ་བཞིན་ཚིགས་སུ་བཅད་པ་གཅིག་སྟོན་པའི་སྒོ་ནས་གཞུང་ཆ་ཚང་བ་ཀློག་ཏུ་འཇུག་གི་ཡོད། སྤྱོད་འཇུག་ལྟ་བུར་མཚོན་ན། ཁྱད་པར་དུ་འཕགས་ཤིང་ཁ་ཡོད་ལག་ཡོད་ཀྱི་ཉམས་ལེན་དང་བློ་སྤོབས་སྤེལ་བའི་ནང་པའི་ལམ་གྱི་རིམ་པའི་ཁྱད་རྣམ་ཆ་ཚང་བའི་གཞུང་ལུགས་ཤིག་ཡིན་པ་རེད། ཞི་བ་ལྷ་ནི་རྒྱ་གར་གྱི་སློབ་དཔོན་ཆེན་པོ་ཞིག་ཡིན་པ་དང་ཁོང་དུས་རབས་ ༨ པའི་ནང་བྱོན། ད་ལྟ་ང་ཚོས་མཇལ་རྒྱུ་ཡོད་པའི་ཁོང་གི་གཞུང་ལུགས་གཉིས་ཏེ། བཀོལ་སྤྱོད་མཉེན་ཆས་འདིའི་ནང་བསྟན་པའི་སྤྱོད་འཇུག་དང་བསླབ་པ་ཀུན་ལས་བཏུས་པ་རེད། གཞུང་དེ་གཉིས་ཀ་ད་ལྟའང་སློབ་གཉེར་བྱེད་ཀྱི་ཡོད་པ་དང་དམིགས་བསལ་སྤྱོད་འཇུག་ནི་བོད་ཀྱི་སྲོལ་རྒྱུན་གྱི་ནང་གཙིགས་ཆེ་ཤོས་བརྩི་བ་དང་ཡང་ནས་ཡང་དུ་སློབ་འཁྲིད་བྱས་དང་བྱེད་མུས་ཀྱི་གཞུང་ལུགས་ནང་གི་གཅིག་ཆགས་ཀྱི་ཡོད།'
    +'</p>'
    +'<p lang="bo" class="bo"><strong>ཁྱེད་ཀྱིས་“'
    +'<a href="https://studybuddhism.com/bo/bod-kyi-nang-chos/ma-dpe-khag/mdo-i-dpe-cha/byang-chub-sems-dp-i-spyod-pa-la-jug-pa" target="_blank" onclick="window.open(\'https://studybuddhism.com/bo/bod-kyi-nang-chos/ma-dpe-khag/mdo-i-dpe-cha/byang-chub-sems-dp-i-spyod-pa-la-jug-pa\',\'_system\');return false;">'
    +'ནང་ཆོས་སྦྱོངས་ (studybuddhism.com)'
    +'</a>'
    +'“ཞེས་པའི་དྲྭ་ཚིགས་བརྒྱུད་ནས་གཞུང་འདི་དང་སྐད་རིགས་སྣ་ཚོགས་པའི་ནང་ནང་པའི་རྒྱུ་ཆའི་རིགས་ཧ་ཅང་མང་པོ་རག་ཐུབ།'
    +'</strong></p>'
    +'<p lang="bo" class="bo">'
    +'“ནང་ཆོས་སྦྱོངས་ (studybuddhism.com)“ཞེས་པ་ནི་སྐད་རིགས་མི་འདྲ་བ་ ༣༡ ཚང་བའི་ནང་ཆོས་ཀྱི་སྐོར་ལ་རྒྱུ་ཆ་ཕུན་སུམ་ཚོགས་པ་མ་ཚང་བ་མེད་པའི་དྲྭ་ཚིགས་ཤིག་ཡིན་པ་རེད། གལ་ཏེ་ཁྱེད་ཀྱིས་བཀོལ་སྤྱོད་མཉེན་ཆས་འདི་ཕན་ཐོགས་ཅན་དུ་མཐོང་ན། ཁོང་ཚོའི་རྒྱ་ཆེ་བའི་རྩོལ་བར་རྒྱབ་སྐྱོར་མཚོན་ཆེད་དྲྭ་ཚིགས་འདིར་ཞལ་འདེབས་གནང་རོགས་ཞུ།';

LANG['bo']={
"App_Title":"རྒྱལ་སྲས་ཆེན་པོ་ཞི་བ་ལྷ།",
"Android App":"ཨེན་ཌྲོ་ཡིཌ་བཀོལ་སྤྱོད་མཉེན་ཆས།",
"iOS App":"ཨ་ཡི་ ཨོ་ ཨེ་ས྄་བཀོལ་སྤྱོད་མཉེན་ཆས།",
"Online App":"དྲྭ་ཐོག་བཀོལ་སྤྱོད་མཉེན་ཆས།",
"Verse of the Day":"དེ་རིང་ཉིན་གྱི་ཚིགས་བཅད།",
"About":"ང་ཚོའི་སྐོར།",
"Settings":"སྒྲིག་སྟངས།",
"Full Text":"གཞུང་ཆ་ཚང་།",
"Chapter %1, Verse %2":"ལེའུ་ %1། ཚིགས་བཅད་ %2།",
"About This App":"བཀོལ་སྤྱོད་མཉེན་ཆས་འདིའི་སྐོར།",
"Jump to this verse in the text.":"ཚིགས་བཅད་འདི་ལ་ཐད་ཀར་གཟིགས།",
"Language of Shantideva's text":"སློབ་དཔོན་ཞི་བ་ལྷའི་གཞུང་གི་སྐད་ཡིག",
"Language of the App":"བཀོལ་སྤྱོད་མཉེན་ཆས་ཀྱི་སྐད་ཡིག",
"You can show the text in up to three different languages at the same time in order to compare different translations.":"འགྱུར་མི་འདྲ་བ་རྣམས་དང་མཚུངས་སྡུར་ཆེད་ཁྱེད་ཀྱིས་སྐད་ཡིག་མི་འདྲ་བ་གསུམ་གྱི་བར་དུ་དུས་གཅིག་ལ་གཞུང་འདི་མིག་སྔར་སྟོན་ཆོག",
"Text Language":"གཞུང་གི་སྐད་ཡིག",
"Text Language 2":"གཞུང་གི་སྐད་ཡིག ༢",
"Text Language 3":"གཞུང་གི་སྐད་ཡིག ༣",
"Display Settings":"སྒྲིག་སྟངས་སྟོན།",
"App Language":"བཀོལ་སྤྱོད་མཉེན་ཆས་ཀྱི་སྐད་ཡིག",
"Font Size":"ཡིག་འབྲུ་ཆེ་ཆུང་།",
"Text color":"ཡིག་གཞིའི་ཁ་དོག",
"Black text on white background":"རྒྱབ་ལྗོངས་དཀར་པོའི་སྟེང་ཡིག་གཞི་ནག་པོ། ",
"White text on black background":"རྒྱབ་ལྗོངས་ནག་པོའི་སྟེང་ཡིག་གཞི་དཀར་པོ།",
"Notification Messages":"བརྡ་ཁྱབ་འཕྲིན་ཡིག",
"Time":"དུས་ཚོད།",
"Daily Message":"ཉིན་རེའི་བརྡ་འཕྲིན།",
"Show Messages":"བརྡ་འཕྲིན་སྟོན།",
"Enable the options below to see the verse of the day as a notification message.":"དེ་རིང་ཉིན་གྱི་ཚིགས་བཅད་དེ་བརྡ་ཁྱབ་འཕྲིན་ཡིག་ཏུ་མཐོང་བའི་ཆེད་གཤམ་གྱི་གདམ་ཀ་སྤྱོད་ནུས་པར་བཟོས།",
"You need to be online when you save the notification settings.":"ཁྱེད་ཀྱིས་བརྡ་ཁྱབ་འཕྲིན་ཡིག་སྒྲིག་སྟངས་ཉར་ཚགས་བྱེད་པའི་སྐབས། ཁྱེད་རང་དྲྭ་ཐོག་ཏུ་ཡོད་དགོས།",
"Notifications can only be displayed you when you are online.":"ཁྱེད་རང་དྲྭ་ཐོག་ཏུ་ཡོད་པ་ཁོ་ནའི་སྐབས་སུ་བརྡ་ཁྱབ་རྣམས་སྟོན་ཐུབ།",
"Favorite Verses":"ཚིགས་བཅད་དགའ་ཤོས།",
"Mark verse as favorite":"ཚིགས་བཅད་དགའ་ཤོས་ཞེས་རྟགས་ཁོད།",
"This verse was marked as a favorite":"ཚིགས་བཅད་འདི་དགའ་ཤོས་སུ་རྟགས་བཀོད་འདུག",
"This verse was removed from your favorites":"ཚིགས་བཅད་འདི་ནི་ཁྱེད་ཀྱི་དགའ་ཤོས་གྲས་ནས་ཕྱིར་འདོན་བྱས་འདུག",
"Cancel":"ཕྱིར་འཐེན་བྱོས།",
"Save":"ཉར་ཚགས་བྱོས།",
"Historical Context of Shantideva's life":"ཞི་བ་ལྷའི་ལོ་རྒྱུས་ཀྱི་སྐབས་དོན།",
"Historical Context":"ལོ་རྒྱུས་ཀྱི་སྐབས་དོན།",
"Translations & Commentaries":"འགྱུར་དང་འགྲེལ་བ།",
"Shantideva Translations":"ཞི་བ་ལྷའི་འགྱུར།",
"Commentaries on Shantideva":"སློ་དཔོན་ཞི་བ་ལྷའི་སྐོར་གྱི་འགྲེལ་བ།",
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
"24:00":"12 pm (24:00) ",
  "About_Text":'<div style="text-align:center" lang="bo" class="bo">'+LOGO+'<p lang="bo" class="bo">'
    + LANG_ABOUT_BO
    +'</p>'
    + LANG_TRANSLATIONS
    +'<hr />'
    + LANG_FONTS
}
