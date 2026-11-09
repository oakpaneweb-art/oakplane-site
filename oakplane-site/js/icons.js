/* Oakplane OS - icon set
   Every icon is drawn here as inline SVG (thick dark outline, flat fills, Oakplane palette)
   and injected once per page as a sprite. Use it in HTML like this:
   <svg class="ico" aria-hidden="true"><use href="#i-mail"/></svg>
*/
(function () {
  var INK = '#010514', NAVY = '#000D35', BLUE = '#0941FD', CYAN = '#63DEFE', PAPER = '#EAF1FF';
  var S = 'stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"';
  var icons = {};

  icons.home =
    '<rect x="7" y="9" width="50" height="35" rx="6" fill="' + BLUE + '" ' + S + '/>' +
    '<rect x="13" y="15" width="38" height="23" rx="3" fill="' + PAPER + '" ' + S + '/>' +
    '<rect x="18" y="20" width="16" height="4" rx="2" fill="' + BLUE + '"/>' +
    '<rect x="18" y="28" width="26" height="3.5" rx="1.75" fill="' + CYAN + '"/>' +
    '<path d="M27 44h10l2 9H25z" fill="' + CYAN + '" ' + S + '/>' +
    '<rect x="19" y="52" width="26" height="5" rx="2.5" fill="' + NAVY + '" ' + S + '/>';

  icons.services =
    '<g transform="translate(32 32)">' +
    [0, 45, 90, 135].map(function (a) {
      return '<rect x="-5.5" y="-27" width="11" height="54" rx="3" fill="' + BLUE + '" ' + S + ' transform="rotate(' + a + ')"/>';
    }).join('') +
    '<circle r="19" fill="' + CYAN + '" ' + S + '/>' +
    '<circle r="8" fill="' + PAPER + '" ' + S + '/></g>';

  icons.work =
    '<path d="M7 17a4 4 0 014-4h14l5 6h22a4 4 0 014 4v28a4 4 0 01-4 4H11a4 4 0 01-4-4z" fill="' + CYAN + '" ' + S + '/>' +
    '<rect x="15" y="22" width="30" height="16" rx="2" fill="' + PAPER + '" ' + S + '/>' +
    '<rect x="7" y="29" width="50" height="26" rx="5" fill="' + BLUE + '" ' + S + '/>' +
    '<path d="M16 38h14" stroke="' + PAPER + '" stroke-width="3.5" stroke-linecap="round"/>';

  icons.about =
    '<circle cx="32" cy="22" r="11" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M10 57c0-15 10-23 22-23s22 8 22 23z" fill="' + BLUE + '" ' + S + '/>' +
    '<path d="M27 21h.01M37 21h.01" stroke="' + NAVY + '" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M28 27q4 3 8 0" fill="none" stroke="' + NAVY + '" stroke-width="2.5" stroke-linecap="round"/>';

  icons.mail =
    '<rect x="5" y="16" width="46" height="34" rx="6" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M7 20l21 16 21-16" fill="none" ' + S + '/>' +
    '<circle cx="50" cy="16" r="11" fill="' + CYAN + '" ' + S + '/>' +
    '<path d="M50 10v12M44 16h12" stroke="' + NAVY + '" stroke-width="3.5" stroke-linecap="round"/>';

  icons.responsive =
    '<rect x="4" y="9" width="40" height="30" rx="5" fill="' + BLUE + '" ' + S + '/>' +
    '<rect x="9" y="14" width="30" height="19" rx="2" fill="' + PAPER + '" ' + S + '/>' +
    '<rect x="12" y="18" width="12" height="3" rx="1.5" fill="' + BLUE + '"/>' +
    '<rect x="12" y="24" width="20" height="3" rx="1.5" fill="' + CYAN + '"/>' +
    '<path d="M18 39h10l1 7H17z" fill="' + CYAN + '" ' + S + '/>' +
    '<rect x="12" y="46" width="22" height="4" rx="2" fill="' + NAVY + '" ' + S + '/>' +
    '<rect x="37" y="24" width="22" height="34" rx="6" fill="' + CYAN + '" ' + S + '/>' +
    '<rect x="41" y="31" width="14" height="20" rx="2" fill="' + PAPER + '" ' + S + '/>' +
    '<rect x="43" y="34" width="8" height="3" rx="1.5" fill="' + BLUE + '"/>';

  icons.calendar =
    '<rect x="6" y="12" width="46" height="42" rx="7" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M6 19a7 7 0 017-7h32a7 7 0 017 7v7H6z" fill="' + BLUE + '" ' + S + '/>' +
    '<rect x="15" y="5" width="6" height="14" rx="3" fill="' + NAVY + '" ' + S + '/>' +
    '<rect x="37" y="5" width="6" height="14" rx="3" fill="' + NAVY + '" ' + S + '/>' +
    '<rect x="13" y="32" width="8" height="7" rx="2" fill="' + CYAN + '"/>' +
    '<rect x="25" y="32" width="8" height="7" rx="2" fill="' + CYAN + '"/>' +
    '<rect x="37" y="32" width="8" height="7" rx="2" fill="' + CYAN + '"/>' +
    '<rect x="13" y="43" width="8" height="7" rx="2" fill="' + CYAN + '"/>' +
    '<circle cx="47" cy="46" r="12" fill="' + CYAN + '" ' + S + '/>' +
    '<path d="M41 46l4 4 8-9" fill="none" stroke="' + NAVY + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';

  icons.pin =
    '<ellipse cx="32" cy="57" rx="14" ry="3.5" fill="' + NAVY + '" opacity=".7"/>' +
    '<path d="M32 5C20 5 13 13 13 23c0 13 19 31 19 31s19-18 19-31C51 13 44 5 32 5z" fill="' + BLUE + '" ' + S + '/>' +
    '<circle cx="32" cy="23" r="7.5" fill="' + PAPER + '" ' + S + '/>';

  icons.rocket =
    '<path d="M27 41h10l-5 16z" fill="' + CYAN + '" ' + S + '/>' +
    '<path d="M24 36L12 44l3 9 11-5z" fill="' + BLUE + '" ' + S + '/>' +
    '<path d="M40 36l12 8-3 9-11-5z" fill="' + BLUE + '" ' + S + '/>' +
    '<path d="M32 5c11 8 13 22 9 36H23C19 27 21 13 32 5z" fill="' + PAPER + '" ' + S + '/>' +
    '<circle cx="32" cy="23" r="6" fill="' + CYAN + '" ' + S + '/>';

  icons.pencil =
    '<path d="M13 41L41 13l10 10L23 51z" fill="' + BLUE + '" ' + S + '/>' +
    '<path d="M13 41l10 10-13 3z" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M41 13l5-5q4-3 8 1l1 1q3 4 0 8l-5 5z" fill="' + CYAN + '" ' + S + '/>' +
    '<path d="M20 34l10 10" fill="none" stroke="' + CYAN + '" stroke-width="3" stroke-linecap="round"/>';

  icons.code =
    '<rect x="5" y="9" width="54" height="46" rx="7" fill="' + NAVY + '" ' + S + '/>' +
    '<path d="M5 16a7 7 0 017-7h40a7 7 0 017 7v6H5z" fill="' + BLUE + '" ' + S + '/>' +
    '<circle cx="13" cy="16" r="2" fill="' + PAPER + '"/><circle cx="20" cy="16" r="2" fill="' + PAPER + '"/>' +
    '<path d="M25 33l-7 7 7 7M39 33l7 7-7 7M35 30l-6 20" fill="none" stroke="' + CYAN + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';

  icons.eye =
    '<path d="M3 32C15 14 49 14 61 32 49 50 15 50 3 32z" fill="' + PAPER + '" ' + S + '/>' +
    '<circle cx="32" cy="32" r="11" fill="' + BLUE + '" ' + S + '/>' +
    '<circle cx="32" cy="32" r="4.5" fill="' + NAVY + '"/>' +
    '<circle cx="36" cy="28" r="2.5" fill="' + PAPER + '"/>';

  icons.check =
    '<circle cx="32" cy="32" r="25" fill="' + CYAN + '" ' + S + '/>' +
    '<path d="M20 33l8 8 17-18" fill="none" stroke="' + NAVY + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';

  icons.heart =
    '<path d="M32 56C9 40 5 27 11 18c6-8 17-6 21 3 4-9 15-11 21-3 6 9 2 22-21 38z" fill="' + BLUE + '" ' + S + '/>' +
    '<path d="M16 25q2-5 7-4" fill="none" stroke="' + PAPER + '" stroke-width="3.5" stroke-linecap="round"/>';

  icons.form =
    '<rect x="12" y="5" width="40" height="54" rx="6" fill="' + PAPER + '" ' + S + '/>' +
    '<rect x="19" y="14" width="26" height="5" rx="2.5" fill="' + BLUE + '"/>' +
    '<rect x="19" y="25" width="26" height="3.5" rx="1.75" fill="' + CYAN + '"/>' +
    '<rect x="19" y="32" width="26" height="3.5" rx="1.75" fill="' + CYAN + '"/>' +
    '<rect x="19" y="39" width="16" height="3.5" rx="1.75" fill="' + CYAN + '"/>' +
    '<rect x="19" y="47" width="14" height="7" rx="3" fill="' + BLUE + '"/>';

  icons.search =
    '<circle cx="27" cy="27" r="17" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M39 39l17 17" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/>' +
    '<path d="M39 39l17 17" stroke="' + CYAN + '" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M19 23a10 10 0 016-5" fill="none" stroke="' + CYAN + '" stroke-width="3.5" stroke-linecap="round"/>';

  icons.shield =
    '<path d="M32 5l21 8v17c0 15-9 23-21 29C20 53 11 45 11 30V13z" fill="' + BLUE + '" ' + S + '/>' +
    '<path d="M22 31l7 7 13-14" fill="none" stroke="' + PAPER + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';

  icons.chat =
    '<path d="M10 10h44a5 5 0 015 5v24a5 5 0 01-5 5H30L18 56V44h-8a5 5 0 01-5-5V15a5 5 0 015-5z" fill="' + PAPER + '" ' + S + '/>' +
    '<circle cx="22" cy="27" r="3.2" fill="' + BLUE + '"/><circle cx="32" cy="27" r="3.2" fill="' + BLUE + '"/><circle cx="42" cy="27" r="3.2" fill="' + BLUE + '"/>';

  icons.clock =
    '<circle cx="32" cy="32" r="25" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M32 17v16l10 6" fill="none" stroke="' + BLUE + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="32" cy="32" r="3" fill="' + NAVY + '"/>';

  icons.tag =
    '<path d="M8 8h20l28 28-20 20L8 28z" fill="' + CYAN + '" ' + S + '/>' +
    '<circle cx="20" cy="20" r="5" fill="' + PAPER + '" ' + S + '/>';

  icons.bolt =
    '<path d="M36 4L14 36h14l-4 24 26-34H36z" fill="' + CYAN + '" ' + S + '/>';

  icons.sound =
    '<path d="M7 24h11l14-11v38L18 40H7z" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M40 23q6 9 0 18M47 16q12 16 0 32" fill="none" stroke="' + CYAN + '" stroke-width="4" stroke-linecap="round"/>';

  icons.mute =
    '<path d="M7 24h11l14-11v38L18 40H7z" fill="' + PAPER + '" ' + S + '/>' +
    '<path d="M41 24l15 16M56 24L41 40" fill="none" stroke="' + CYAN + '" stroke-width="4" stroke-linecap="round"/>';

  icons.globe =
    '<circle cx="32" cy="32" r="25" fill="' + BLUE + '" ' + S + '/>' +
    '<ellipse cx="32" cy="32" rx="11" ry="25" fill="none" stroke="' + PAPER + '" stroke-width="3"/>' +
    '<path d="M7 32h50M12 19h40M12 45h40" fill="none" stroke="' + PAPER + '" stroke-width="3" stroke-linecap="round"/>';

  icons.phone =
    '<rect x="18" y="5" width="28" height="54" rx="7" fill="' + PAPER + '" ' + S + '/>' +
    '<rect x="24" y="12" width="16" height="30" rx="2" fill="' + BLUE + '"/>' +
    '<circle cx="32" cy="50" r="3" fill="' + NAVY + '"/>';

  icons.arrow =
    '<path d="M10 32h40M35 16l16 16-16 16" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';

  var out = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>';
  Object.keys(icons).forEach(function (k) {
    out += '<symbol id="i-' + k + '" viewBox="0 0 64 64">' + icons[k] + '</symbol>';
  });
  out += '</defs></svg>';

  var holder = document.createElement('div');
  holder.innerHTML = out;
  document.body.insertBefore(holder.firstChild, document.body.firstChild);
})();
