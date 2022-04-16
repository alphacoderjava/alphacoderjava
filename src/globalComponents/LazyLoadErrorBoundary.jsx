import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log('error in err boundary', error);

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('err boundary did catch', error);
    }

    render() {
        if (this.state.hasError) {
            return <p>Loading failed! Please reload.</p>;
        }

        return this.props.children;
    }
}