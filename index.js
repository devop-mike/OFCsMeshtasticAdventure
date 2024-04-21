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
  function tdp(val) {
    if (val == undefined) { return '' }
    return val.toFixed(3);
  }
  function asDate(timestamp) {
    if (timestamp == undefined) { return '' }
    let d = new Date(timestamp * 1000);
    return d.toISOString().substring(0, 19).replace('T', ' ');
  }
  function timeAgo(timestamp) {
    if (timestamp == undefined) { return '' }
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
      + '<div class="row header">'
      + '<div>Short Name</div>'
      + '<div>Long Name</div>'
      + '<div>HW Model</div>'
      + '<div>Role</div>'
      + '<div>SNR</div>'
      + '<div>Last Heard</div>'
      + '<div>Time Ago</div>'
      + '<div>Hops Away</div>'
      + '<div>Battery Level</div>'
      + '<div>Voltage</div>'
      + '<div>Channel Utilization</div>'
      + '<div>Air Util TX</div>'
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
    html += '<div>' + clean(node.hopsAway) + '</div>';
    html += '<div>' + clean(node.deviceMetrics.batteryLevel) + '</div>';
    html += '<div>' + tdp(node.deviceMetrics.voltage) + '</div>';
    html += '<div>' + tdp(node.deviceMetrics.channelUtilization) + '</div>';
    html += '<div>' + tdp(node.deviceMetrics.airUtilTx) + '</div>';
    html += '</div>';
    return html;
  }
  $(".nodes .stats").each((_, elem) => {
    $.get($(elem).attr("data-target"), (nodes) => {
      let html = header();
      for (const [key, node] of Object.entries(nodes).toSorted((a, b) => (b[1].lastHeard ?? 0) - (a[1].lastHeard ?? 0))) {
        html += formatrow(node);
      }
      $(elem).html(html)
    });
  });
});
