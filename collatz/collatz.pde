HashMap<Integer, ArrayList<Integer>> LUT = new HashMap<Integer, ArrayList<Integer>>();
HashMap<Integer, Integer> LUT2 = new HashMap<Integer, Integer>();

ArrayList<Integer> generate(int i) {
  ArrayList<Integer> numbers = new ArrayList<Integer>();
  while(i>1) {
    if(LUT.get(i) != null) {
      numbers.addAll(LUT.get(i));
      break;
    }
    numbers.add(i);
    i = (i%2==0) ? i/2 : 3*i + 1;
    if(i==1) {
      numbers.add(1);
    }
  }
  return numbers;
}

int findMinSteps(ArrayList<Integer> list) {
  for(int t=0; t<list.size(); t++) {  
    if (list.get(t) < list.get(0)) return t;
  }
  return list.size();
}

void draw() {
  int maxSteps = 400;
  int prev = 0;
  for (int i=0; i<maxSteps; i++) {
    ArrayList<Integer> result = generate(i); 
    LUT.put(i, result);
    int steps = findMinSteps(result);
    LUT2.put(i,steps);
    if(i%2==1 && steps == 11) {
      print(" " + i + ": m < n reached in " + steps + " steps (out of " + (result.size() - 1) +")");
      if(prev>0) {
        int modulo = i - prev;
        print(" modulo = "+modulo);
      }
      prev = i;
      println();
    }
  }
  
  
  exit();
}

