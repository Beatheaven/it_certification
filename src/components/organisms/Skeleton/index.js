import React, { Component } from 'react';
import classname from 'classnames';

// style
import './styles.scss';

class Skeleton extends Component {
  render() {
    const classNames = classname('o-skeleton', {});
    return (
      <div className={classNames}>
        <p>
          <span className="o-skeleton skeleton-box small-header" />
          <span className="o-skeleton skeleton-box full" />
          <span className="o-skeleton skeleton-box full" />
          <span className="o-skeleton skeleton-box medium" />
        </p>

        <ul>
          <li>
            <div className="o-skeleton o-questions">
              <div className="icon-question">
                <p>
                  <span className="o-skeleton skeleton-box q-icon" />
                </p>
              </div>
              <div className="text-question">
                <p>
                  <span className="o-skeleton skeleton-box q-text" />
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="o-skeleton o-questions">
              <div className="icon-question">
                <p>
                  <span className="o-skeleton skeleton-box q-icon" />
                </p>
              </div>
              <div className="text-question">
                <p>
                  <span className="o-skeleton skeleton-box q-text" />
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="o-skeleton o-questions">
              <div className="icon-question">
                <p>
                  <span className="o-skeleton skeleton-box q-icon" />
                </p>
              </div>
              <div className="text-question">
                <p>
                  <span className="o-skeleton skeleton-box q-text" />
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="o-skeleton o-questions">
              <div className="icon-question">
                <p>
                  <span className="o-skeleton skeleton-box q-icon" />
                </p>
              </div>
              <div className="text-question">
                <p>
                  <span className="o-skeleton skeleton-box q-text" />
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Skeleton;
