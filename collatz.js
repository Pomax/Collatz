// get the page parameters
var params = (function() {
  var params = {};
  var getParams = function(v) { var t = v.split('='); params[t[0]] = t[1]; };
  window.location.search.replace('?','').split('&').map(getParams);
  return params;
}());

// Simpler "to the power" function
function pow(n, p) {
  if(p==0)
    return 1;
  return n * pow(n, p-1);
}

// inverse collatz sequencer
function icollatz(value) {
  value = (value-1)/3;
  if(value===Math.floor(value)) return value;
  return false;
}

// inverse collatz base sequence and followups computer
function generateSequence(base, limit) {
  base = parseInt(base,10);
  limit = limit || 20;
  var sequence = [base],
      b = limit;
  for (b=0; b<limit; b++) {
    if (b>0) {
      sequence[b] = 2*sequence[b-1];
    }
  }
  return sequence;
}

var csequences = {};

function collatz(value) {
  if(value===1) return [1];
  if(csequences[value]) return csequences[value];

  var list = [value];
  var t = value;
  while(t!==1) {
    t = (t%2===0 ? t/2 : 3*t+1);
    list.push(t);
  }
  csequences[value] = list;  
  return csequences[value];
}

function generalCollatz(value) {
  var glen = value;
  var path = collatz(value);
  for(var i=0, l=path.length; i<l; i++) {
    if(path[i]<glen) {
      glen = i;
      break;
    }
  };
  return {
    path: path,
    length: path.length,
    generalPath: path.slice(0,glen),
    generalLength: glen 
  };
}

function getSubset(sequence) {
  var len = 1,
      matched = false,
      sets,
      i,j,l,
      limit=3;
  while (!matched && len<sequence.length) {
    matched = true;
    sets = [];
    l = limit;
    for (i=0; i<l; i++) {
      sets.push(
        sequence.slice(i * len, (i+1) * len)
      );
    }
    l = sets[0].length;
    for (i=0; i<l; i++) {
      var ref = sets[0][i];
      for (j=1; j<limit; j++) {
        if(sets[j][i] !== ref) {
          matched = false;
          break;
        }
      }
      if (!matched) break;
    }
    if(!matched) len++;
  }

  return sequence.slice(0,len);
}

function getBaseModulos(len) {
  var sequence = [], gc, diff = [], i;
  for(i=2; i<10000*len; i++) {
    gc = generalCollatz(i);
    if(gc.generalLength === len) {
      sequence.push(i);
      if(sequence.length > 1) {
        diff.push(
          sequence[sequence.length-1] - sequence[sequence.length-2]
        );
      }
    }
  }
  var diffset = getSubset(diff);
  if(diffset.length === 0) return false;
  return {
    modulo: diffset.reduce(function(a,b) { return a+b; }),
    bases: sequence.slice(0, diffset.length)
  };
}
