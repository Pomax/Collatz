// A React component that can generate us our triangles
CollatzPaths = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value,
      limit: this.props.limit
    };
  },
  render: function() {
    var sequences = this.generateSequences(this.state.value, this.state.limit);
    var rows = this.generateRows(sequences);
    var body = <tbody>{rows}</tbody>;
    return <table>{body}</table>;
  },
  generateRows: function(sequences) {
    return sequences.map(function(s) {
      return (<tr>
        <td>{s.path[0]}</td>
        <td>{s.path.length}</td>
        <td>{s.generalLength}</td>
        <td>{s.generalPath.slice(1,10).join(",")}</td>
        <td>{s.path.slice(1,10).join(",")}</td>
      </tr>);
    });
  },
  generateSequences: function(value, limit) {
    var seqs = [], cv;
    for(var i=value; i<limit; i++) {
      seqs.push(generalCollatz(i));
    }
    return seqs;
  }
});
