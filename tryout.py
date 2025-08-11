import math

def find_middle(x1, x2, x4, x5, tol=1e-9):
    """
    Vind x3 uit (x1, x2, x3, x4, x5) met alleen x3 onbekend.
    Herkent in volgorde:
      1) Fibonacci-achtig (x4 = x2 + x3 én x5 = x3 + x4)
      2) Exponentieel kwadraterings-patroon (elk volgend = vorig^2)
      3) Kwadratische verschillen (differences == n^2, (n-1)^2, …)
      4) Rekenkundige rij
      5) Constante tweede verschillen
      6) Meetkundige verschillen
      anders fallback.
    """
    # bekende verschillen
    z0 = x2 - x1
    z3 = x5 - x4
    w  = x4 - x2

    # 1) Fibonacci-achtig
    x3_cand = x4 - x2
    if abs(x3_cand - (x1 + x2)) < tol and abs(x5 - (x3_cand + x4)) < tol:
        print("Pattern: Fibonacci-like")
        return x3_cand

    # 2) Exponentieel kwadraterings-patroon
    x3_cand = x2**2
    if abs(x4 - x3_cand**2) < tol and abs(x5 - x4**2) < tol:
        print("Pattern: square-each-time")
        return x3_cand

    # 3) Kwadratische verschillen (abs(z0)=n^2, abs(z3)=(n-3)^2,zelfde teken)
    if abs(z0) > tol and abs(z3) > tol:
        n0 = int(round(math.sqrt(abs(z0))))
        n3 = int(round(math.sqrt(abs(z3))))
        if abs(n0**2 - abs(z0))<tol and abs(n3**2 - abs(z3))<tol and n0 - n3 == 3 and z0*z3 > 0:
            sign = 1 if z0>0 else -1
            # z1 = ±(n0-1)^2
            z1 = sign*(n0-1)**2
            x3_cand = x2 + z1
            # check z2 matches
            if abs((x4 - x3_cand) - sign*(n0-2)**2) < tol:
                print("Pattern: quadratic differences")
                return x3_cand

    # 4) Rekenkundige rij?
    if abs(w - 2*z0) < tol:
        print("Pattern: arithmetic")
        return (x1 + x5)/2

    # 5) Constante tweede verschillen?
    k      = (z3 - z0)/3
    z1_lin = z0 + k
    z2_lin = z0 + 2*k
    if abs((z1_lin + z2_lin) - w) < tol:
        print("Pattern: constant second differences")
        return x2 + z1_lin

    # 6) Meetkundige verschillen?
    B = z0*z3
    D = w*w - 4*B
    if D >= -tol:
        sqrtD = math.sqrt(max(D,0))
        for z2 in [(w+sqrtD)/2] + ([(w-sqrtD)/2] if D>tol else []):
            z1 = w - z2
            x3_cand = x2 + z1
            if abs(z1/z0 - z2/z1) < tol and abs(z2/z1 - z3/z2) < tol:
                print("Pattern: geometric differences")
                return x3_cand

    # fallback
    print("Pattern: fallback (no known pattern)")
    # kies eerste kandidaat van meetg. wortel-oplossing
    sqrtD = math.sqrt(max(D,0))
    z2    = (w + sqrtD)/2
    z1    = w - z2
    return x2 + z1


# Testjes
if __name__ == "__main__":
    # Fibonacci
    print(find_middle(1, 1, 3, 5))       
    # kwadraat-patroon
    print(find_middle(2, 4, 256, 65536)) 
    # verschillen = kwadraten
    print(find_middle(55, 30, 5, 1))     
    # bestaand
    print(find_middle(10,5, -5, -10 ))     
