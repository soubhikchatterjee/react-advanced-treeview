import React from "react";
import PropTypes from "prop-types";
import icon from "./fontawesome";
import "../Bookmark.css";

class Bookmark extends React.Component {
  state = {
    showBookmarkResults: false
  };

  toggleBookmarkResults = () => {
    this.setState({
      showBookmarkResults: !this.state.showBookmarkResults
    });
  };

  bookmarkList = () => {
    if (Object.keys(this.props.bookmarks).length > 0) {
      return (
        <div className="item-wrapper bookmark-results">
          {Object.keys(this.props.bookmarks).map(path => {
            const node = this.props.bookmarks[path];

            return (
              <div key={path} className="indent mb bookmark-item">
                <span
                  onClick={() => this.props.handleRemoveBookmark(node)}
                  title="Remove Bookmark"
                  className="remove-bookmark"
                >
                  {icon.close()}
                </span>
                <div
                  onClick={() => {
                    this.props.handleBookmarkClick(node);
                    this.toggleBookmarkResults();
                  }}
                >
                  {icon.file(node)} <span>{node.name}</span>
                </div>
                <div className="bookmark-path">{path}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="item-wrapper bookmark-results empty-results">
        <span className="tomato">{icon.close()}</span> No Bookmarks Added
      </div>
    );
  };

  render() {
    return (
      <div className="bookmark-wrapper">
        <div
          onClick={this.toggleBookmarkResults}
          className="bookmark-icon"
          title="Show Bookmarks"
        >
          {icon.star()}
        </div>

        <div
          style={{ display: this.state.showBookmarkResults ? "block" : "none" }}
        >
          <p className="title">Bookmarks</p>
          {this.bookmarkList()}
        </div>
      </div>
    );
  }
}

Bookmark.propTypes = {
  bookmarks: PropTypes.object.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  handleRemoveBookmark: PropTypes.func.isRequired
};

export default Bookmark;
