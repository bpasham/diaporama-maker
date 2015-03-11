var React = require("react");
var _ = require("lodash");
var Thumbnail = require("../Thumbnail");
var DragItems = require("../../constants").DragItems;
var DragDropMixin = require('react-dnd').DragDropMixin;

var LibraryImage = React.createClass({

  mixins: [DragDropMixin],

  statics: {
    configureDragDrop: function (register) {
      register(DragItems.IMAGE, {
        dragSource: {
          beginDrag: function (component) {
            return {
              item: component.props.item
            };
          }
        }
      });
    }
  },

  getDefaultProps: function () {
    return {
      used: 0
    };
  },

  render: function () {
    var width = this.props.width;
    var height = this.props.height;
    var item = this.props.item;
    var used = this.props.used;
    var dragging = this.props.dragging;

    var style = _.extend({
      width: width+"px"
    }, this.props.style||{});
    
    var thumbnailStyle = {
      opacity: !used ? 1 : 0.5
    };

    var border = dragging ? 1 : 2;
    var thumbnailContainerStyle = {
      backgroundColor: "#000",
      border: border+"px solid",
      borderColor: dragging||used ? "#000" : "#FC0",
      boxShadow: !dragging ? "" : "0px 1px 12px rgba(0,0,0,1)"
    };

    var countUsageStyle = {
      position: "absolute",
      bottom: "22px",
      right: "6px",
      color: "#fff",
      zIndex: 2,
      fontSize: "0.8em"
    };

    var titleStyle = {
      display: "inline-block",
      width: "100%",
      fontSize: "0.8em",
      fontWeight: 300,
      color: used ? "#666" : "#d80",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };
    
    return <div
      className="library-image item"
      title={item.file}
      style={style}
      {...this.dragSourceFor(DragItems.IMAGE)}
    >
      { !used ? undefined :
        <span style={countUsageStyle}>
          {used}
          ×
        </span>}
      <div style={thumbnailContainerStyle}>
        <Thumbnail style={thumbnailStyle} width={width-2*border} height={height-2*border} image={item.url} />
      </div>
      { dragging ? undefined :
      <span style={titleStyle}>{item.file}</span>
      }
    </div>;
  }

});

module.exports = LibraryImage;
