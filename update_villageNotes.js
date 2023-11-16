    if (top.frames.length > 1){
        var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
    } else {
        doc = document;
    };

DorfnotizInfo();

$(window.document).find('#hk').append('<input type="button" value="Herkunft pflegen" id="HKB" />');
$(window.document).find('#zl').append('<input type="button" value="Ziel pflegen" id="ZLB" />');
$(window.document).find('#ut').append('<input type="button" value="Unterstuetzer plegen" id="ULB" />');
//$("#HK").css("align", left).css("left", 0);

$('#HKB').click(function(){
    UpdateNotiz('att');
});

$('#ZLB').click(function(){
    UpdateNotiz('def');
});

$('#ULB').click(function(){
    UpdateNotiz('unt');
});


$('document').ready(function() {
    CommandsOverview.init();
    UI.ToolTip('.icon_village_notes');

    $('.quickedit').QuickEdit({url: TribalWars.buildURL('POST', 'info_command', {ajaxaction: 'edit_other_comment', id: '__ID__'})});
    Command.init();
});

$( function() { UI.ToolTip( $( '.village_note' ), { bodyHandler: function() { return this.tooltipText; }, extraClass: "tooltip-style not-bold" } ); } );

function fehlermeldung()
{
    UI.InfoMessage('Du musst dich in einem Bericht befinden!',3000,true);
}

function UpdateNotiz(selector) {
    var vorschlag = getVorschlag(selector)
    if(vorschlag === "")
    {
        return;
    }
    var link = getLink(selector);
    var win = window.open(link);
    win.focus();
    win.onload = function() {
        var origNotiz = $(win.window.document).find('#message').val();
        var ol = origNotiz.trim().length;
        var vl = vorschlag.trim().length;
        var ot = origNotiz.substring(0, vl);
        if(ot != vorschlag.trim())
        {
            $(win.window.document).find('#message').val(vorschlag + '\n' + origNotiz);
            win.VillageInfo.Notes.toggleEdit();
            setTimeout(function() { $(win.window.document).find('#note_submit_button').click(); }, 200);
        }
        else
        {
            UI.InfoMessage('Diese Informationen existieren bereits in der Dorfnotiz',2000,true);
        }

        void(0);
        setTimeout(function() { win.window.close(); }, 500);
    }
}

function getCoord(dorfname)
{
    var splits = dorfname.split("|");
    var splitsl = splits.length;
    if(splits < 2)
    {
        return "";
    }

    var y = splits[splits.length-1].split(")")[0];
    var xsplits = splits[splits.length-2].split("(");
    var x = xsplits[xsplits.length-1];

    return "("+x+"|"+y+")";
}

function calcDinstance(herkunftDorfname, zieldorfname)
{
    var hcoord = getCoord(herkunftDorfname);
    var zcoord = getCoord(zieldorfname);



    var hx = hcoord.split('(')[1].split('|')[0];
    var hy = hcoord.split('|')[1].split(')')[0];
    var zx = zcoord.split('(')[1].split('|')[0];
    var zy = zcoord.split('|')[1].split(')')[0];
    var xd = Math.abs(hx-zx);
    var yd = Math.abs(hy-zy);

    if(hx.length != 3
        || hy.length != 3
        || zx.length != 3
        || zy.length != 3)
    {
        return "";
    }

    var dist = Math.sqrt((xd*xd)+(yd*yd));
    dist = dist*10;
    dist = Math.round(dist);
    dist = dist/10;

    return dist; //Math.sqrt((xd*xd)+(yd*yd));
}

function DorfnotizInfo()
{

    var action = 'att';
    var art = 'rest';
    var datum = getDatum();
    var zeit = getZeit();

    var spieler = getSpieler(action);
    var link = getLink(action);
    var truppen = troops(action, art);
    var truppenAuserhalb = troopsAway();

    var gedefftval = gedefft();
    var offval = offInfo();
    var offVor = vorschlagAngreifer();
    var defVor = vorschlagVerteidiger();
    var butterino = getButtons(offVor, defVor);
    var h = "530|394";
    var z = "516|478";

    var hx = "530";
    var hy = "394";
    var zx = "516";
    var zy = "478";

    var hd = Math.abs(hx-zx);
    var zd = Math.abs(zy-zy);

    var ent = Math.sqrt((hd*hd)+(zd*zd));
    var koord = "asdf (" + h + ")" + "asdfasdf";
    //koord.split('(')[villages1[i][i].split('<a')[1].split('(').length - 2].split(')')[0];
    var asdfx = koord.split('(')[1].split('|')[0];
    var asdfy = koord.split('|')[1].split(')')[0];

    //fehlermeldung();

    var output =
        /*
                 "<tr><td style='color:blue; font-weight: bold;'>" + "datum" + "</td><td style='color:red; text-align:right'>" + datum + "</td></tr>"
               + "<tr><td style='color:blue; font-weight: bold;'>" + "zeit" + "</td><td style='color:red; text-align:right'>" + zeit + "</td></tr>"
               + "<tr><td style='color:blue; font-weight: bold;'>" + "spieler" + "</td><td style='color:red; text-align:right'>" + spieler + "</td></tr>"
               + "<tr><td style='color:blue; font-weight: bold;'>" + "truppen" + "</td><td style='color:red; text-align:right'>" + truppen + "</td></tr>"
               + "<tr><td style='color:blue; font-weight: bold;'>" + "truppen ausserhalb" + "</td><td style='color:red; text-align:right'>" + truppenAuserhalb + "</td></tr>"
               + "<tr><td style='color:blue; font-weight: bold;'>" + "gedefftval" + "</td><td style='color:red; text-align:right'>" + gedefftval + "</td></tr>"
               + "<tr><td style='color:blue; font-weight: bold;'>" + "offval" + "</td><td style='color:red; text-align:right'>" + offval + "</td></tr>"
             +*/
        getButtons(offVor, defVor);
    ;


    //  + "<tr><td><img src='https://dsde.innogamescdn.com/asset/3b2f093/graphic/overview/note.png' class='icon_village_notes'><a href='/game.php?village=4605&amp;screen=info_village&amp;id=21949'>|#No Comment! (376|433) K43</a></td><td></td></tr>"
    //;

    var main_div = $("<div id='ADS_Display' class='popup_style' style='display: block; top: 51px; left: 20px; border-radius: 8px; border: 2px #804000 solid; background-color: #F1EBDD; z-index: 9999; position: fixed'><div id='inline_popup_menu' style='cursor: auto; text-align:center;'>Dorfnotizpflegen: "
        + "</div><div style='padding: 15px 10px 5px 10px;'><table id='ADS_Display_Main' style='vertical-align:middle;'></table><br><a onclick='$(\"#ADS_Display\").remove();' style='cursor: pointer;'>Schliessen</a></div></div>");
    if ($('#ADS_Display').length==0){
        $('.maincell').append(main_div);
        //$(main_div).draggable();
    } else {
        $("#ADS_Display").show();
    }
    $("#ADS_Display_Main").html(output);
    /*
    $('document').ready(function() {
        CommandsOverview.init();
        UI.ToolTip('.icon_village_notes');

        $('.quickedit').QuickEdit({url: TribalWars.buildURL('POST', 'info_command', {ajaxaction: 'edit_other_comment', id: '__ID__'})});
        Command.init();
    });
*/
}

function getButtons(offVor, defVor)
{
    //var offAvail = offVor != "";
    //var defAvail = defVor != "";
    var untVor = vorschlagUnterstuetzung();
    if(offVor == ""
        && defVor == ""
        && untVor != "")
    {
        return "<tr><td style='color:blue; font-weight: bold;'>" + "Vorschlag Unterstuetzer" + "<td style='color:red; text-align:right'>" + untVor + "</td></tr>"
            + "<tr><td id='ut' colspan='2'></td></tr>";
    }
    else
    {
        //return defVor.substring(0, 10) + defVor; //"asdf" + defVor.length + " " + defVor.substring(0, 5);
        return "<tr><td style='color:blue; font-weight: bold;'>" + "vorschlag Angreifer" + "</td><td style='color:red; text-align:right'>" + offVor + "</td></tr>"
            + "<tr><td style='color:blue; font-weight: bold;'>" + "vorschalg Verteidiger" + "</td><td style='color:red; text-align:right'>" + defVor + "</td></tr>"
            + "<tr><td id='hk'></td><td id='zl'></td></tr>";
        //        return "<tr><td id='hk'></td><td id='zl'></td></tr>";
    }
}

function getDatum()
{
    return $('#content_value > table > tbody > tr > td:nth-child(2)  > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)').text().substring(1, 15);
}

function getZeit()
{
    return $('#content_value > table > tbody > tr > td:nth-child(2)  > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)').text().substring(16, 21);
}

function getLink(selector)
{
    return getDorfElement(selector).find('a').attr('href');
}

function getDorfname(selector)
{
    return getDorfElement(selector).text();
}

function getDorfElement(selector)
{
    if(selector == "att"
        || selector == "def")
    {
        return $('table#attack_info_' + selector).find('span.village_anchor.contexted');
    }
    if(selector == "unt")
    {
        return $('#content_value').find('span.village_anchor.contexted');
    }
}

function getVorschlag(selector)
{
    switch (selector)
    {
        case "att":
            return vorschlagAngreifer();
            break;
        case "def":
            return vorschlagVerteidiger();
            break;
        case "unt":
            return vorschlagUnterstuetzung();
            break;
    }
}

function vorschlagAngreifer()
{
    var result = offInfo();
    var distance = "";
    if(result !== "")
    {
        if(result.indexOf("Off") !== -1
            && (result.indexOf("voll") !== -1
                || result.indexOf("90%") !== -1
                || result.indexOf("80%") !== -1
                || result.indexOf("70%") !== -1
                || result.indexOf("60%") !== -1
                || result.indexOf("50%") !== -1
                || result.indexOf("40%") !== -1)
            && result.indexOf("Down") === -1
            && result.indexOf("down") === -1)
        {
            result = getZeit() + " " + calcDinstance(getDorfname("att"), getDorfname("def")) + " " + result;
        }
        return getDatum() + " " + result + " - " + getSpieler('att');
    }
    return "";
}

function vorschlagVerteidiger()
{
    var away = troopsAway();
    var verteidiger = gedefft();

    if(away === 0)
    {
        if(verteidiger === 0)
        {
            verteidiger = 'CLEAN';
        }
        else
        {
            if (trpDefTotal('rest') === 0)
            {
                verteidiger = 'CLEAN';
            }
        }
        away = '';
    }
    if(verteidiger === 0)
    {
        verteidiger = '';
    }

    var result = verteidiger + away;

    if(result !== '')
    {
        if(away !== '' && away !== 'leer')
        {
            if(result.includes("Off") && result.includes("%") && result.includes("ausserhalb"))
            {
                result = result.replace("Off down", "");
            }
            result = result.replace("CLEAN", "Leer");
        }
        return getDatum() + " " + result + " - " + getSpieler('def');
    }
    return "";
}

function vorschlagUnterstuetzung()
{
    var result = troopsUnterstuetzt();
    if(result !== "")
    {
        return getDatum() + " " + result + " - " + getSpieler('unt');
    }
    return "";
}

function getSpieler(attORdef)
{
    if(attORdef == 'unt')
    {
        // BROKEN
        var spieler = $('#content_value').find('div.report_transparent_overlay').find('a').first().text();
        if(spieler === '')
        {
            spieler = $('#content_value').find('td.report_ReportSupportRetract').find('a').first().text();
        }
        //         if(spieler === '')
        //         {
        //             // mss
        //             spieler = $('#content_value > table > tbody > tr > td:nth-child(2)  > table > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(5) > td > div > div table > tbody > tr > th:nth-child(2)').first().text();
        //         }
        return spieler;
    }
    return $('table#attack_info_' + attORdef + ' > tbody > tr > th:nth-child(2)').text();
}

function troops(attORdef, selector)
{
    // params werden nicht verwendet
    return "Off: " + trpOffTotal('orig') + " perc: " + toPerc(trpOffTotal('orig')) + " Def: " + trpDefTotal('orig') + " Def: " + trpDefTotal('down') + " Def: " + trpDefTotal('rest');
}

function troopsAway()
{
    var sp = troopSpyAway('spear');
    var sw = troopSpyAway('sword');
    var ax = troopSpyAway('axe');
    var sy = troopSpyAway('spy');
    var lk = troopSpyAway('light');
    var sk = troopSpyAway('heavy');
    var rm = troopSpyAway('ram');
    var kt = troopSpyAway('catapult');
    var tpoff = (ax + (lk * 4) + (rm * 5) + (kt * 8));
    var tpdef = (sp + sw + (sk * 6));
    var tpspy = (sy);

    var offPerc = toPerc(tpoff);
    var defPerc = toPerc(tpdef);
    var spyPerc = toPerc(tpspy);

    if((tpoff+tpdef+tpspy) === 0)
    {
        return 0;
    }

    var maxVal = Math.max(offPerc, defPerc);
    if(maxVal > 20)
    {
        maxVal = toDecPerc(maxVal);
        if(maxVal > 80)
        {
            maxVal = 'voll';
        }
        else
        {
            maxVal = maxVal + "%";
        }
        return tpType(offPerc, defPerc) + ' ' + maxVal + ' ausserhalb';
    }

    return '';
}

function tpType(offcnt, defcnt)
{
    if(offcnt > defcnt)
    {
        return 'Off';
    }
    if(offcnt < defcnt)
    {
        return 'Deff';
    }
    return '';
}

function toPerc(tpcnt)
{
    var perc = Math.round(tpcnt / 20000 * 100); // Math.abs(10 * 20000 / tpcnt);
    if(perc > 100)
    {
        return 100;
    }
    return perc;
}

function offDown()
{
    var tporig = trpOffTotal("orig");
    var tprest = trpOffTotal("rest");

    if(toPerc(tporig) >= 80
        && toPerc(tprest) < 10)
    {
        return "Off down";
        //return "off down " + toDecPerc(toPerc(tporig)) + "% " + tporig;
    }
    return "";
}

function offLebt()
{
    var tprest = trpOffTotal('rest');
    var rperc = toPerc(tprest);
    var rdperc = toDecPerc(rperc);
    if(rdperc >= 20)
    {
        if(rdperc >= 80)
        {
            return 'Off voll';
        }
        return 'Off ' + rdperc + '% ';
    }
    return "";
}

function offPercDown()
{
    var tpdown = trpOffTotal('down');
    var dperc = toPerc(tpdown);
    if(dperc >= 10)
    {
        return "Off " + toDecPerc(dperc) + "% down";
    }
    return "";
}

function toDecPerc(perc)
{
    return (Math.round(perc/10)*10);
}

function offInfo()
{
    var odown = offDown();
    var olebt = offLebt();
    var opdown = offPercDown();

    if(odown != '')
    {
        return odown;
    }
    else if (olebt != '')
    {
        return olebt;
    }
    else if (opdown != '')
    {
        return opdown;
    }
    return '';
}

function gedefft()
{
    var tpdef = trpDefTotal('orig');
    if(tpdef == 0)
    {
        return 0;
    }

    if(tpdef === "")
    {
        if(toDecPerc(toPerc(trpOffTotal('orig'))) > 80)
        {
            return "rot";
        }
        return "";
    }

    var sp = troopicon('def', 'spear', 'rest');
    var sw = troopicon('def', 'sword', 'rest');
    var ax = troopicon('def', 'axe', 'rest');
    var sy = troopicon('def', 'spy', 'rest');
    var lk = troopicon('def', 'light', 'rest');
    var sk = troopicon('def', 'heavy', 'rest');
    var rm = troopicon('def', 'ram', 'rest');
    var kt = troopicon('def', 'catapult', 'rest');

    var tp = trpDefTotal('rest');

    var spk = toK(sp);
    var swk = toK(sw);
    var skk = toK(sk);

    var torig = trpOffAlsVerteidiger('orig');
    var torigperc = toPerc(torig);

    //return toPerc(trpOffAlsVerteidiger('orig'));
    var result = "";
    if (torigperc > 10)
    {
        if(trpOffAlsVerteidiger('rest') <= 200)
        {
            return 'Off down';
        }
        result = result + 'Off ' + toDecPerc(toPerc(trpOffAlsVerteidiger('rest'))) + '%';
    }
    //return "tp: " + tp + " torig: " + torig + " torigperc: " + torigperc + " tpdef: " + tpdef + " ";
    if (tp == 0)
    {
        if(toDecPerc(toPerc(tpdef)) <= 10)
        {
            return '';
        }
        return 'CLEAN ';
    }
    if (spk < 1 && swk < 1 && skk < 1)
    {
        return result;
    }
    if ((spk + swk) > 5)
    {
        var spswabs = Math.abs(spk - swk);
        if (spswabs < 7)
        {
            return Math.round((spk+swk)/2) + 'k Dual ' + filterdef(0,0,skk) + " " + result;
        }
    }
    if ((sp + sw) > 1800)
    {
        var val = Math.abs(sp - sw);
        if(val < 800)
        {
            return Math.round((spk+swk)/2) + 'k Dual ' + filterdef(0,0,skk) + " " + result;
        }
    }
    return filterdef(spk, swk, skk) + " " + result;
    return result;
}

function filterdef(spk, swk, skk)
{
    var result = "";
    if(filterk(spk) >= 1
        &&filterk(swk) >= 1)
    {
        result = result + filterk(spk) + "/" + filterk(swk) + "k ";
    }
    else
    {
        if(filterk(spk) >= 1)
        {
            result = result + filterk(spk) + "k sp ";
        }
        if(filterk(swk) >= 1)
        {
            result = result + filterk(swk) + "k sw ";
        }
    }
    if(filterk(skk) >= 1)
    {
        result = result + filterk(skk) + "k sk ";
    }
    return result;
}

function filterk(kval)
{
    if (kval >= 1)
    {
        return kval;
    }
    return "";
}

function trpOffTotal(selector)
{
    var ax = troopicon('att', 'axe', selector);
    var lk = troopicon('att', 'light', selector);
    var rm = troopicon('att', 'ram', selector);
    var kt = troopicon('att', 'catapult', selector);
    var sk = troopicon('att', 'heavy', selector);
    var tp = ((1*ax) + (4*lk) + (5*rm) + (6*sk) + (8*kt));
    return tp;
}

function trpOffAlsVerteidiger(selector)
{
    var ax = troopicon('def', 'axe', selector);
    var lk = troopicon('def', 'light', selector);
    var rm = troopicon('def', 'ram', selector);
    var kt = troopicon('def', 'catapult', selector);
    var tp = ((1*ax) + (4*lk) + (5*rm) + (8*kt));
    return tp;
}

function trpDefTotal(selector)
{
    var sp = troopicon('def', 'spear', selector);
    var sw = troopicon('def', 'sword', selector);
    var ax = troopicon('def', 'axe', selector);
    var sy = troopicon('def', 'spy', selector);
    var lk = troopicon('def', 'light', selector);
    var sk = troopicon('def', 'heavy', selector);
    var rm = troopicon('def', 'ram', selector);
    var kt = troopicon('def', 'catapult', selector);

    if(sp === "")
    {
        return "";
    }

    var tp = ((1*sp) + (1*sw) + (1*ax) + (2*sy) + (4*lk) + (6*sk) + (5*rm) + (8*kt));
    return tp;
}

function toK(val)
{
    if ((val / 1000) > 1)
    {
        return Math.round(val / 1000);
    }
    else
    {
        return 0;
    }
}

function troopsUnterstuetzt(unit)
{
    var h4 = $('td#content_value').find('h4').text();
    if(h4 == 'Einheiten:')
    {
        var sp = $('td#content_value').find('td.unit-item.unit-item-spear').text();
        var sw = $('td#content_value').find('td.unit-item.unit-item-sword').text();
        var sk = $('td#content_value').find('td.unit-item.unit-item-heavy').text();

        if(sp + sw + sk > 150)
        {
            return 'Deff (U) ';
        }
    }
    return '';
}

function troopSpyAway(unit)
{
    var result = $('table#attack_spy_away').find('td.unit-item.unit-item-' + unit).text();
    return parseInt(result);
}

function troopicon(attORdef, unit, selector)
{
    var orig = $('table#attack_info_' + attORdef + '_units > tbody > tr:nth-child(2)').find('td.unit-item.unit-item-' + unit).text();
    var down = $('table#attack_info_' + attORdef + '_units > tbody > tr:nth-child(3)').find('td.unit-item.unit-item-' + unit).text();
    var rest = (orig - down);
    var result = "";

    if(orig === "0")
    {
        return 0;
    }
    if(orig > 0)
    {
        switch (selector)
        {
            case "orig":
                result = orig;
                break;
            case "down":
                result = down;
                break;
            case "rest":
                result = (orig - down);
                break;
        }
        return result;
    }
    // ## fix this: u
    return "";
}