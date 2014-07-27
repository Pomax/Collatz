int j = 0;
int prev = 1;
int max = 500000;
for(int i=1; i<max; i++) {
  int a = 2*i;
  int b = i-1;
  boolean b2 = (b%3 == 0);
  String s = b+"/3";
  String suffix = "";
  int t = 1;
  if(b2) {
    b = b/3;
    s = "" + b;
    if(b % 2 == 1) {
      //suffix = " => " + ((3*b + 1) / 2);
    }
    if ((i - 10) % 6 == 0) {
      suffix += "\t\t[*]";

      int v = b;
      while(t++<1000) {
        if (v < b) {
          suffix += "\t v < b in " + t + " steps";
          break;
        }
        v = (v % 2 == 0) ? v/2 : 3 * v + 1;
      }

   //   println(i + " → " + a + " - " + s + suffix);// + ", step: " + (i-prev));

    }
  }

  if (t==21) {   
    println(j++ + "> " + i + "\t" + a + " - " + s + suffix + ", step: " + (i-prev));
    prev = i;
  }
}

exit();
