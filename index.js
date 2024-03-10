$(document).ready(() => {
  $(".snip").each((_, elem) => {
    $(elem).load($(elem).attr("data-target"));
  });
  $(".code.snip").each((_, elem) => {
    $(elem).click(() => {
      window.location.href = $(elem).attr("data-target");
    });
  });
  function clean(val) {
    if (val == undefined) { return '' }
    return val;
  }
  function asDate(timestamp) {
    let d = new Date(timestamp * 1000);
    return d.toISOString().substr(0, 19).replace('T', ' ');
  }
  function timeAgo(timestamp) {
    secs = Math.floor(Date.now() / 1000) - (timestamp);
    if (secs > 86400 * 2.5) { return Math.floor(secs / 86400) + ' days' }
    if (secs > 3600 * 2) { return Math.floor(secs / 3600) + ' hours' }
    if (secs > 60 * 2) { return Math.floor(secs / 60) + ' mins' }
    if (secs > 0) { return secs + ' secs' }
    if (secs > -1) { return secs + ' secs' }
    return '';
  }
  function header() {
    return ''
      + '<div class="row">'
      + '<div>shortName</div>'
      + '<div>longName</div>'
      + '<div>hwModel</div>'
      + '<div>role</div>'
      + '<div>snr</div>'
      + '<div>lastHeard</div>'
      + '<div>timeAgo</div>'
      + '<div>batteryLevel</div>'
      + '<div>voltage</div>'
      + '<div>channelUtilization</div>'
      + '<div>airUtilTx</div>'
      + '</div>'
      + '';
  }
  function formatrow(node) {
    // console.log(node.user.shortName);
    if (!node.deviceMetrics) { node.deviceMetrics = {} }
    let html = '<div class="row">';
    html += '<div>' + node.user.shortName + '</div>';
    html += '<div>' + node.user.longName + '</div>';
    html += '<div>' + node.user.hwModel + '</div>';
    html += '<div>' + clean(node.user.role) + '</div>';
    html += '<div>' + clean(node.snr) + '</div>';
    html += '<div>' + asDate(node.lastHeard) + '</div>';
    html += '<div>' + timeAgo(node.lastHeard) + '</div>';
    html += '<div>' + clean(node.deviceMetrics.batteryLevel) + '</div>';
    html += '<div>' + clean(node.deviceMetrics.voltage) + '</div>';
    html += '<div>' + clean(node.deviceMetrics.channelUtilization) + '</div>';
    html += '<div>' + clean(node.deviceMetrics.airUtilTx) + '</div>';
    html += '</div>';
    return html;
  }
  $(".nodes .stats").each((_, elem) => {
    $.get($(elem).attr("data-target"), (nodes) => {
      let html = header();
      for (const [key, node] of Object.entries(nodes).toSorted((a, b) => b[1].lastHeard - a[1].lastHeard)) {
        html += formatrow(node);
      }
      $(elem).html(html)
    });
  });
});
