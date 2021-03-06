import React from "react";

require("./context-menu.css");

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPlaylistsMenu: false
    }

    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.onAddSongToPlaylist = this.onAddSongToPlaylist.bind(this);
  }

  mouseEnterHandler(event) {
    if ($(event.target.children).hasClass("add-to-playlist-menu")) {
      this.setState({showPlaylistsMenu: true});
    } else {
      this.setState({showPlaylistsMenu: false});
    }
  }

  onAddSongToPlaylist(pl, event) {
    event.stopPropagation();
    this.props.addSongToPlaylist(pl, this.props.song);
    this.props.actions.hideContextMenu();
  }

  // NOTE: I think might have been implemented wrong...
  // Context Menu is attached to every song in the mainarea playlist
  // And everytime currentContextMenuId gets updated, all of them are re-rendered
  render() {
    var currentContextMenuId = this.props.currentContextMenu ?
      this.props.currentContextMenu.id : null;
    if (!currentContextMenuId || this.props.id !== currentContextMenuId) {
      return null;
    }

    var menuStyle = {
      top: this.props.currentContextMenu.mousePosition.y,
      left: this.props.currentContextMenu.mousePosition.x
    };
    var menuItems;
    if (this.props.menuItems) {
      menuItems = this.props.menuItems.map((item, idx) => {
        if (item.action) {
          return <li key={idx} onClick={item.action} onMouseEnter={this.mouseEnterHandler}>{item.item}</li>
        } else {
          return <li key={idx} onMouseEnter={this.mouseEnterHandler}>{item.item}</li>
        }
      });
    }
    var expandedContextMenuClass = classNames({
      "expanded-context-menu": true,
      "hidden": !this.state.showPlaylistsMenu
    });
    var localPlaylistItems;
    if (this.props.localPlaylists) {
      localPlaylistItems = this.props.localPlaylists.map((pl, idx) =>
        <li key={idx} onClick={this.onAddSongToPlaylist.bind(this, pl)}>{pl.playlistName}</li>
      );
    }

    return (
      <div className="context-menu" style={menuStyle}>
        <ul>
          {menuItems}
        </ul>
        <ul className={expandedContextMenuClass}>
          {localPlaylistItems}
        </ul>
      </div>
    );
  }
}

export default ContextMenu;
