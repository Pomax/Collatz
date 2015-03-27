// A React component that can generate us our triangles
CollatzModulos = React.createClass({
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
    var v = this.state.value;
    var alignLeft = { textAlign: "left" };
    return sequences.map(function(s, i) {
      var bm = getBaseModulos(i+v);
      if(!bm) return false;
      return (<tr>
        <td>length { i + v }</td>
        <td>{ bm.bases.length < 15 ? bm.bases.join(', ') : bm.bases.length + " bases" }</td>
        <td style={alignLeft}>mod { bm.modulo }</td>
      </tr>);
    });
  },
  generateSequences: function(value, limit) {
    var seqs = [], cv;
    for(var i=value; i<limit; i++) {
      seqs.push(getBaseModulos(i));
    }
    return seqs;
  }
});
