// A React component that can generate us our triangles
CollatzMatrix = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value,
      limit: this.props.limit,
      history: []
    };
  },
  render: function() {
    var sequence = generateSequence(this.state.value, this.state.limit);
    var rows = this.generateRows(sequence);

    var history = this.state.history;
    var len = history.length;
    var back = len > 0 ? <tr><td className="back" colSpan={sequence.length} onClick={this.back}>back to {history[len-1]}</td></tr> : false;

    var head = <thead>{rows.slice(0,1)}</thead>;
    var body = <tbody>{rows.slice(1)}{back}</tbody>;
    return (<table>{head}{body}</table>);
  },
  generateRows: function(sequence) {
    var generateColumns = this.generateColumns;

    var rows = [ generateColumns(sequence, true) ];
    var len = sequence.length;
    var empties = (new Array(len)).join(',').split(',').map(function(){ return <td/>; });

    for(var i=0; i<len; i++) {
      var nval = icollatz(sequence[i]);
      if(nval!==false) {
        var cols = generateColumns(generateSequence(nval, this.props.limit));
        if(i > 0) { cols = empties.slice(0,i).concat(cols.slice(0,-i)); }
        rows.push(cols);
      }
    }

    return rows.map(function(content, idx) {
      return <tr>{content}</tr>;
    });
  },
  generateColumns: function(arr, thead) {
    var onclick = this.changeValue;
    return arr.map(function(v, idx) {
      var href = "?v=" + v;
      var attr = { className: "clickable", onClick: onclick };

      if (idx===0) {
        attr.className += " leading";
        var nval = (v-1)/3;
        if (nval !== Math.floor(nval)) { attr.className += " terminal"; }
      }
      if (v%3===0) { attr.className += " divthree"; }

      if(thead) { return <th {...attr}>{v}</th>; }
      return <td {...attr}>{v}</td>;
    });
  },
  changeValue: function(evt) {
    this.setState({
      history: this.state.history.concat([this.state.value]),
      value: parseInt(evt.target.innerHTML, 10)
    });
  },
  back: function() {
    var history = this.state.history;
    var len = history.length;
    if(len>0) {
      var popped = history[len-1];
      history = history.slice(0,len-1);
      this.setState({ history: history, value: popped });
    }
  }
});
