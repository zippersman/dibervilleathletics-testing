/* Shared loading screen: shows a spinning record and a philosopher's quote, then goes to the page you tapped. */
(function(){
  /* [quote, author]. Add or remove lines freely. */
  var LR = "François de La Rochefoucauld";
  var QUOTES = [
    /* La Rochefoucauld */
    ["Our virtues are, most often, only vices in disguise.", LR],
    ["Self-love is the greatest flatterer of all.", LR],
    ["We all have strength enough to bear the misfortunes of others.", LR],
    ["Neither the sun nor death can be looked at steadily.", LR],
    ["Hypocrisy is the tribute that vice pays to virtue.", LR],
    ["Absence lessens small passions and strengthens great ones, as the wind blows out a candle and feeds a fire.", LR],
    ["We would rather speak ill of ourselves than not speak of ourselves at all.", LR],
    ["Nothing is so contagious as example.", LR],
    ["Everyone complains about his memory, and no one about his judgment.", LR],
    ["It is easier to be wise for others than for ourselves.", LR],
    ["We promise according to our hopes, and keep our word according to our fears.", LR],
    ["Gratitude, in most people, is only a longing for greater favors to come.", LR],
    ["We are never as happy, or as unhappy, as we imagine.", LR],
    ["The love of justice is, in most of us, only the fear of suffering injustice.", LR],
    ["Passion is the only orator who always persuades.", LR],
    ["Quarrels would not last long if the fault were only on one side.", LR],
    ["Few people know how to be old.", LR],
    ["True love is like a ghost: everyone talks about it, and few have seen it.", LR],
    ["Weakness is more opposed to virtue than vice is.", LR],
    ["Old men love to give good advice, to console themselves for no longer being able to set a bad example.", LR],

    /* Socrates */
    ["The unexamined life is not worth living.", "Socrates"],
    ["I neither know nor think that I know.", "Socrates"],

    /* Plato */
    ["The beginning is the most important part of the work.", "Plato"],

    /* Aristotle */
    ["Man is by nature a political animal.", "Aristotle"],
    ["Wishing to be friends is quick work, but friendship is a slow-ripening fruit.", "Aristotle"],

    /* Marcus Aurelius */
    ["What stands in the way becomes the way.", "Marcus Aurelius"],
    ["Waste no more time arguing about what a good man should be. Be one.", "Marcus Aurelius"],

    /* Epictetus */
    ["Men are disturbed not by things, but by the views they take of them.", "Epictetus"],

    /* Seneca */
    ["We suffer more often in imagination than in reality.", "Seneca"],

    /* Heraclitus */
    ["No man ever steps in the same river twice, for it is not the same river, and he is not the same man.", "Heraclitus"],

    /* Nietzsche */
    ["He who has a why to live can bear almost any how.", "Friedrich Nietzsche"],

    /* Kierkegaard */
    ["Life can only be understood backwards; but it must be lived forwards.", "Søren Kierkegaard"],

    /* Bible (King James Version) */
    ["Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.", "Ecclesiastes 1:2"],
    ["There is no new thing under the sun.", "Ecclesiastes 1:9"],
    ["To every thing there is a season, and a time to every purpose under the heaven.", "Ecclesiastes 3:1"],
    ["Better is a handful with quietness, than both the hands full with travail and vexation of spirit.", "Ecclesiastes 4:6"],
    ["Two are better than one; because they have a good reward for their labour.", "Ecclesiastes 4:9"],
    ["The race is not to the swift, nor the battle to the strong.", "Ecclesiastes 9:11"],
    ["Whatsoever thy hand findeth to do, do it with thy might.", "Ecclesiastes 9:10"],
    ["Cast thy bread upon the waters: for thou shalt find it after many days.", "Ecclesiastes 11:1"],

    ["Trust in the Lord with all thine heart; and lean not unto thine own understanding.", "Proverbs 3:5"],
    ["The fear of the Lord is the beginning of wisdom.", "Proverbs 9:10"],
    ["Hatred stirreth up strifes: but love covereth all sins.", "Proverbs 10:12"],
    ["A soft answer turneth away wrath: but grievous words stir up anger.", "Proverbs 15:1"],
    ["Better is a dinner of herbs where love is, than a stalled ox and hatred therewith.", "Proverbs 15:17"],
    ["Pride goeth before destruction, and an haughty spirit before a fall.", "Proverbs 16:18"],
    ["He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city.", "Proverbs 16:32"],
    ["A friend loveth at all times, and a brother is born for adversity.", "Proverbs 17:17"],
    ["A merry heart doeth good like a medicine: but a broken spirit drieth the bones.", "Proverbs 17:22"],
    ["Even a fool, when he holdeth his peace, is counted wise.", "Proverbs 17:28"],
    ["A good name is rather to be chosen than great riches.", "Proverbs 22:1"],
    ["As he thinketh in his heart, so is he.", "Proverbs 23:7"],
    ["He that hath no rule over his own spirit is like a city that is broken down, and without walls.", "Proverbs 25:28"],
    ["Faithful are the wounds of a friend.", "Proverbs 27:6"],
    ["Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.", "Proverbs 27:17"],
    ["Where there is no vision, the people perish.", "Proverbs 29:18"],

    ["The Lord is my shepherd; I shall not want.", "Psalm 23:1"],
    ["Yea, though I walk through the valley of the shadow of death, I will fear no evil.", "Psalm 23:4"],
    ["Weeping may endure for a night, but joy cometh in the morning.", "Psalm 30:5"],
    ["Be still, and know that I am God.", "Psalm 46:10"],
    ["So teach us to number our days, that we may apply our hearts unto wisdom.", "Psalm 90:12"],
    ["I will lift up mine eyes unto the hills, from whence cometh my help.", "Psalm 121:1"],
    ["Thy word is a lamp unto my feet, and a light unto my path.", "Psalm 119:105"],
    ["This is the day which the Lord hath made; we will rejoice and be glad in it.", "Psalm 118:24"],

    ["Naked came I out of my mother’s womb, and naked shall I return thither.", "Job 1:21"],
    ["Man that is born of a woman is of few days, and full of trouble.", "Job 14:1"],
    ["Be strong and of a good courage; be not afraid, neither be thou dismayed.", "Joshua 1:9"],
    ["They shall run, and not be weary; and they shall walk, and not faint.", "Isaiah 40:31"],
    ["What doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?", "Micah 6:8"],

    ["Man shall not live by bread alone.", "Matthew 4:4"],
    ["Where your treasure is, there will your heart be also.", "Matthew 6:21"],
    ["Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself.", "Matthew 6:34"],
    ["Judge not, that ye be not judged.", "Matthew 7:1"],
    ["For what shall it profit a man, if he shall gain the whole world, and lose his own soul?", "Mark 8:36"],
    ["As ye would that men should do to you, do ye also to them likewise.", "Luke 6:31"],
    ["He that is without sin among you, let him first cast a stone.", "John 8:7"],
    ["Ye shall know the truth, and the truth shall make you free.", "John 8:32"],
    ["Greater love hath no man than this, that a man lay down his life for his friends.", "John 15:13"],
    ["Be not overcome of evil, but overcome evil with good.", "Romans 12:21"],
    ["Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain.", "1 Corinthians 9:24"],
    ["And now abideth faith, hope, charity, these three; but the greatest of these is charity.", "1 Corinthians 13:13"],
    ["We walk by faith, not by sight.", "2 Corinthians 5:7"],
    ["Whatsoever a man soweth, that shall he also reap.", "Galatians 6:7"],
    ["Let not the sun go down upon your wrath.", "Ephesians 4:26"],
    ["I have fought a good fight, I have finished my course, I have kept the faith.", "2 Timothy 4:7"],
    ["Faith is the substance of things hoped for, the evidence of things not seen.", "Hebrews 11:1"],
    ["Let us run with patience the race that is set before us.", "Hebrews 12:1"],

    /* Classroom of the Elite: episode opening quotes, seasons 1-3 */
    /* Season 1 */
    ["What is evil? Whatever springs from weakness.", "Friedrich Nietzsche"],
    ["It takes a great talent and skill to conceal one's talent and skill.", LR],
    ["Man is an animal that makes bargains: no other animal does this. No dog exchanges bones with another.", "Adam Smith"],
    ["We should not be upset that others hide the truth from us when we hide it from ourselves.", LR],
    ["There are two kinds of lies; one concerns an accomplished fact, the other concerns a future duty.", "Jean-Jacques Rousseau"],
    ["Nothing is as dangerous as an ignorant friend; a wise enemy is to be preferred.", "Jean de La Fontaine"],
    ["Abandon all hope, ye who enter here.", "Dante Alighieri"],
    ["Man is condemned to be free.", "Jean-Paul Sartre"],
    ["Every man has in himself the most dangerous traitor of all.", "Søren Kierkegaard"],
    ["What people commonly call fate is mostly their own stupidity.", "Arthur Schopenhauer"],
    ["Genius lives only one story above madness.", "Arthur Schopenhauer"],

    /* Season 2 */
    ["Remember to keep a clear head in difficult times.", "Horace"],
    ["There are two main human sins from which all the others derive: impatience and indolence.", "Franz Kafka"],
    ["The greatest souls are capable of the greatest vices as well as of the greatest virtues.", "René Descartes"],
    ["The material has to be created.", "Florence Nightingale"],
    ["Every failure is a step to success.", "William Whewell"],
    ["Adversity is the first path to truth.", "Lord Byron"],
    ["To doubt everything or to believe everything are two equally convenient solutions; both dispense with the necessity of reflection.", "Henri Poincaré"],
    ["The wound is at her heart.", "Virgil"],
    ["If you make a mistake and do not correct it, this is called a mistake.", "Confucius"],
    ["People, often deceived by an illusive good, desire their own ruin.", "Niccolò Machiavelli"],
    ["A man who cannot command himself will always be a slave.", "Johann Wolfgang von Goethe"],
    ["Force without wisdom falls of its own weight.", "Horace"],
    ["The worst enemy you can meet will always be yourself.", "Friedrich Nietzsche"],

    /* Season 3 */
    ["The strongest principle of growth lies in the human choice.", "George Eliot"],
    ["Man is wolf to man.", "Plautus"],
    ["We never forget what we endeavor to forget.", "Friedrich Nietzsche"],
    ["To work you have the right, but not to the fruits thereof.", "Bhagavad Gita"],
    ["Fortune favors the bold.", "Virgil"],
    ["It is better to receive an injury than to inflict one.", "Cicero"],
    ["People will do anything, no matter how absurd, in order to avoid facing their own souls.", "Carl Jung"],
    ["Those who cannot remember the past are condemned to repeat it.", "George Santayana"],
    ["Extreme justice is extreme injustice.", "Cicero"],
    ["The first cause of absurd conclusions I ascribe to the want of method.", "Thomas Hobbes"],
    ["There is only one rule in love: bring happiness to those you love.", "Stendhal"],
    ["Change your desires rather than the order of the world.", "René Descartes"],
    ["Love is the best teacher.", "Pliny the Younger"],

      /* Coach Nick */
    ["If everyone fought fire with fire, the whole world would burn.", "Coach Nick"],
    ["Victim Mentality Bullcrap!", "Coach Nick"],

    /* Anonymous */
    ["There's some easter egg quotes. Catch em' all!", "Anonymous"]
  ];

  var el = document.createElement("div");
  el.className = "ld";
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-hidden", "true");
  el.innerHTML =
    '<div class="ld-stage"><div class="ld-glow"></div>' +
    '<div class="ld-disc"><div class="ld-label"><span>DHS</span></div></div>' +
    '<div class="ld-arm" aria-hidden="true"><i class="pv"></i><i class="bar"></i><i class="hd"></i></div></div>' +
    '<p class="ld-q"><span class="ld-t"></span><span class="ld-by"></span></p>' +
    '<button type="button" class="ld-skip">Skip <span aria-hidden="true">\u2192</span></button>';
  document.body.appendChild(el);
  var text = el.querySelector(".ld-t");
  var by = el.querySelector(".ld-by");
  var skip = el.querySelector(".ld-skip");
  var going = false, timer = null, target = null;

  function pick(){
    var last = -1;
    try { last = parseInt(sessionStorage.getItem("ldLast"), 10); } catch(e){}
    var i;
    do { i = Math.floor(Math.random() * QUOTES.length); } while (i === last && QUOTES.length > 1);
    try { sessionStorage.setItem("ldLast", String(i)); } catch(e){}
    return QUOTES[i];
  }

  function hide(){
    going = false;
    clearTimeout(timer);
    target = null;
    el.classList.remove("on");
    el.setAttribute("aria-hidden", "true");
  }

  function go(url){
    if (going) return;
    going = true;
    target = url;
    var p = pick(), q = p[0];
    text.textContent = "“" + q + "”";
    by.textContent = p[1];
    el.setAttribute("aria-hidden", "false");
    el.classList.add("on");
    var wait = Math.min(3400, 1800 + q.length * 22);
    timer = setTimeout(function(){ location.href = url; }, wait);
  }

  /* skip: go to the page right now instead of waiting out the quote */
  function skipNow(){
    if (!going || !target) return;
    clearTimeout(timer);
    location.href = target;
  }
  skip.addEventListener("click", function(e){ e.preventDefault(); e.stopPropagation(); skipNow(); });
  document.addEventListener("keydown", function(e){
    if (going && (e.key === "Escape" || e.key === "Enter")){ e.preventDefault(); skipNow(); }
  });

  document.addEventListener("click", function(e){
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(mailto:|tel:|javascript:)/i.test(href)) return;
    var u;
    try { u = new URL(a.href, location.href); } catch(err){ return; }
    if (u.origin !== location.origin) return;
    /* same page, only the #section changes: no loading screen */
    if (u.pathname === location.pathname && u.search === location.search) return;
    e.preventDefault();
    go(u.href);
  });

  /* coming back with the browser's back button should not leave the screen up */
  addEventListener("pageshow", function(e){ if (e.persisted) hide(); });
})();
