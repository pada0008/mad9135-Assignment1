let AddNewForm = React.createClass({
    propTypes: {
        itemsCount: React.PropTypes.number.isRequired
        , menuItem: React.PropTypes.object.isRequired
        , onChange: React.PropTypes.func.isRequired
        , onSubmit: React.PropTypes.func.isRequired
    }
    , onNameChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.menuItem, {
            name: e.target.value
        }));
    }
    , ondistrictsChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.menuItem, {
            districts: e.target.value
        }));
    }
    , oncapitalChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.menuItem, {
            capital: e.target.value
        }));
    }
    , onSubmit: function () {
        if (this.props.menuItem.name != "" && this.props.menuItem.capital != "" && this.props.menuItem.districts != "") {
            this.props.onSubmit(this.props.menuItem);
            this.props.onChange(Object.assign({}, this.props.menuItem, {
                name: ""
                , capital: ""
                , districts: ""
            }));
        }
        else {
            alert("All fields are required.");
        }
    }
    , render: function () {
        return (React.createElement("div", {
            className: "inner-content"
        }, React.createElement("form", {}, React.createElement("input", {
            type: "text"
            , placeholder: "Name"
            , value: this.props.menuItem.name
            , onChange: this.onNameChange
        }), React.createElement("input", {
            type: "number"
            , placeholder: "Districts"
            , value: this.props.menuItem.districts
            , onChange: this.ondistrictsChange
        }), React.createElement("input", {
            type: "text"
            , placeholder: "Capital"
            , value: this.props.menuItem.capital
            , onChange: this.oncapitalChange
        }), React.createElement("button", {
            type: "button"
            , onClick: this.onSubmit
        }, "Add"))));
    }
});
let FormView = React.createClass({
    getInitialState: function () {
        return {
            menuItem: inputItem
            , items: menuList
            , onNewMenuItemChange: this.updateNewMenuItem
            , onSubmitNewItem: this.addNewItem
        };
    }
    , setState: function (changes) {
        Object.assign(this.state, changes);
        this.forceUpdate();
    }
    , updateNewMenuItem: function (item) {
        this.setState({
            menuItem: item
        });
    }
    , addNewItem: function (item) {
        let itemList = this.state.items;
        itemList.push(Object.assign({}, {
            id: itemList.length + 1
        }, item));
        this.setState({
            items: itemList
        });
    }
    , render: function () {
        return (React.createElement("div", {
            className: "main-content"
        }, React.createElement(header, {}), React.createElement(navBar, {}), React.createElement(AddNewForm, {
            id: "formView"
            , itemsCount: this.state.items.length
            , menuItem: this.state.menuItem
            , onChange: this.state.onNewMenuItemChange
            , onSubmit: this.state.onSubmitNewItem
        })));
    }
});
let navBar = React.createClass({
    render: function () {
        return (React.createElement("div", {
            id: "menu"
            , className: "main-menu"
        }, React.createElement("ul", null, React.createElement("li", {
            id: "btnList"
            , className: "btnBar"
        }, React.createElement("a", {
            href: "#provinceList"
        }, "Main Provinces")), React.createElement("li", {
            id: "btnAdd"
            , className: "btnBar"
        }, React.createElement("a", {
            href: "#addprovince"
        }, "Add a Province")))));
    }
});
let header = React.createClass({
    render: function () {
        return (React.createElement("div", {
            id: "header"
            , className: "main-header"
        }, React.createElement("img", {
            id: "main-image"
            , src: "map.gif"
            , alt: "world map"
        })));
    }
});
let ItemPage = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
        , districts: React.PropTypes.string.isRequired
        , capital: React.PropTypes.string
    }
    , render: function () {
        return (React.createElement("div", {
            className: "main-content"
        }, React.createElement(header, {}), React.createElement(navBar, {}), React.createElement("div", {
            className: "inner-content"
        }, React.createElement("div", {
            className: "item-box"
        }, React.createElement("h1", {}, this.props.name), React.createElement("p", {}, "Capital:" + this.props.capital), React.createElement("p", {}, "Districts: " + this.props.districts), React.createElement("a", {
            href: "#provinceList"
        })))));
    }
});
let ListView = React.createClass({
    render: function () {
        let listElement = menuList.map(function (item) {
            return React.createElement("li", {
                key: item.id
            }, React.createElement("a", {
                href: "#/item/" + item.id
            }, React.createElement("h2", {
                className: "name"
            }, item.name)));
        });
        return (React.createElement("div", {
            className: "main-content"
        }, React.createElement(header, {}), React.createElement(navBar, {}), React.createElement("div", {
            className: "inner-content"
        }, React.createElement("ul", {
            className: "province-list"
        }, listElement))));
    }
});
let state = {
    location: ""
};

function setState(changes) {
    let component;
    Object.assign(state, changes);
    let splittedUrl = state.location.replace(/^#\/?|\/$/g, "").split("/");
    let componentProperties = {};
    switch (splittedUrl[0]) {
    case "addprovince":
        component = FormView;
        break;
    case "item":
        component = ItemPage;
        componentProperties = menuList.find((i) => i.id === parseInt(splittedUrl[1]));
        break;
    default:
        component = ListView;
    }
    ReactDOM.render(React.createElement(component, componentProperties), document.getElementById("react-app"));
}
window.addEventListener("hashchange", () => setState({
    location: location.hash
}));
setState({
    location: location.hash
});