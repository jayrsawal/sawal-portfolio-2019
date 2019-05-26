$(document).ready(function() {
  $(".mosaic-item").each(function() {
    minimizeOverflow($(this));
  });

  $(".expand-btn").click(function(e) {
    let $elem = $(e.target).parents(".mosaic-item");
    if ($elem.hasClass("open")) closeItem($elem);
    else openItem($elem);
  });

  $(window).on("resize", resize);
  resize();
  let d = new Date();
  $("footer").html("Victor Sawal - " + d.getFullYear().toString());
});

function resize() {
  $(".mosaic-item").each(function() {
    let $elem = $(this);
    if ($elem.hasClass("open")) openItem($elem);
    else {
      let $content = $(".item-content", $elem);
      let fullHeight = $content.height() + $(".item-title", $elem).height();
      let rows = getStaticRowSpan($elem) + 1;
      $elem.css("grid-row", "span " + rows.toString());
    }
  });
}

function minimizeOverflow($elem) {
  let $content = $(".item-content", $elem);
  let fullHeight = $content.height() + $(".item-title", $elem).height();
  if ($content.length == 0) return;
  if ($content[0].offsetHeight < $content[0].scrollHeight) {
    $content.prepend("<div class='overlay'></div>");
    $elem.append(
      "<div class='expand-btn'>More <i class='angle double down icon'></i></div>"
    );
  }
}

function openItem($elem) {
  $(".item-content", $elem).css("max-height", "none");
  let rows = getStaticRowSpan($elem);
  $elem.css("grid-row", "span " + rows.toString());
  $elem.addClass("open");
  $(".overlay", $elem).hide();
  $(".expand-btn", $elem).html("Less <i class='angle double up icon'></i>");
}

function getStaticRowSpan($elem) {
  let contentHeight =
    $(".item-title", $elem).height() + $(".item-content", $elem).height();
  let rowHeight =
    parseInt($elem.parent().css("grid-auto-rows")) +
    parseInt($elem.parent().css("grid-gap")) / 2;
  let rows = Math.round(contentHeight / rowHeight);
  return isNaN(rows) ? 1 : rows;
}

function closeItem($elem) {
  $(".item-content", $elem).css("max-height", 250);
  $elem.css("grid-row", "span 5");
  $elem.removeClass("open");
  $(".overlay", $elem).show();
  $(".expand-btn", $elem).html("More <i class='angle double down icon'></i>");
}
