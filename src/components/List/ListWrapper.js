import React, { Component } from 'react';
import ListItem from './ListItem';

const ListWrapper = ({ className, items}) => {
  return (
    <div className={className}>
      <ul>
        {items.map((item, index) => {
          return (
        <ListItem
          key={`item.text-${index}`}
          className={item.className}
          href={item.href}
          text={item.text}
        />
          );
        })}
      </ul>
    </div>
  );
}

export class ActiveListWrapper extends Component {
	constructor(props) {
		super(props)
    this.state = {
      items: props.items
    }
	}

updateItem = (type, submitClick) => {
	return event => {
		event.preventDefault();
		this.state.items.map(item => {
			if (item.type === type) {
				item.className = 'selected';
				return item;
			} else item.className = '';
			return item;
		});
		submitClick(event);
	};
};

	render() {
		return (
			<div className={this.props.className}>
				<ul>
					{this.state.items.map((item, index) => {
						return (
							<ListItem
								key={`item.text-${index}`}
								className={item.className}
								href={item.href}
								text={item.text}
								onClick={this.updateItem(item.type, item.onClick)}
							/>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default ListWrapper;
