import math

def find_middle(x1, x2, x4, x5, tol=1e-9):
    """
    Vind x3 uit (x1, x2, x3, x4, x5) met alleen x3 onbekend.
    Herkent in volgorde:
      1) Fibonacci-achtig
      2) Elk volgend = vorig^2
      3) Kwadratische verschillen
      4) Rekenkundige rij
      5) Constante tweede verschillen
      6) Meetkundige verschillen
      7) LINEAR RATIO PROGRESSION (factorial-like)
      anders fallback.
    """
    z0 = x2 - x1
    z3 = x5 - x4
    w  = x4 - x2

    # 1) Fibonacci-like
    x3 = x4 - x2
    if abs(x3 - (x1 + x2)) < tol and abs(x5 - (x3 + x4)) < tol:
        print("Pattern: Fibonacci-like")
        return x3

    # 2) square-each-time
    x3 = x2**2
    if abs(x4 - x3**2) < tol and abs(x5 - x4**2) < tol:
        print("Pattern: square-each-time")
        return x3

    # 3) quadratic differences
    if abs(z0) > tol and abs(z3) > tol:
        n0 = int(round(math.sqrt(abs(z0))))
        n3 = int(round(math.sqrt(abs(z3))))
        if (abs(n0**2 - abs(z0))<tol 
            and abs(n3**2 - abs(z3))<tol 
            and n0 - n3 == 3 
            and z0*z3 > 0):
            sign = 1 if z0>0 else -1
            z1 = sign*(n0-1)**2
            x3 = x2 + z1
            if abs((x4 - x3) - sign*(n0-2)**2) < tol:
                print("Pattern: quadratic differences")
                return x3

    # 4) arithmetic
    if abs(w - 2*z0) < tol:
        print("Pattern: arithmetic")
        return (x1 + x5)/2

    # 5) constant second differences
    k      = (z3 - z0)/3
    z1_lin = z0 + k
    z2_lin = z0 + 2*k
    if abs((z1_lin + z2_lin) - w) < tol:
        print("Pattern: constant second differences")
        return x2 + z1_lin

    # 6) geometric differences
    B = z0*z3
    D = w*w - 4*B
    if D >= -tol:
        sqrtD = math.sqrt(max(D,0))
        for z2 in [(w+sqrtD)/2] + ([(w-sqrtD)/2] if D>tol else []):
            z1 = w - z2
            x3 = x2 + z1
            if abs(z1/z0 - z2/z1) < tol and abs(z2/z1 - z3/z2) < tol:
                print("Pattern: geometric differences")
                return x3

    # 7) linear ratio progression (factorial-like)
    if abs(x1) > tol and abs(x2) > tol and abs(x4) > tol and abs(x5) > tol:
        r0 = x2 / x1
        r3 = x5 / x4
        # expect ratios to increase linearly by k each step: r0, r0+k, r0+2k, r0+3k = r3
        k = (r3 - r0) / 3
        r1 = r0 + k
        r2 = r0 + 2*k
        # check x4 == x2 * r1 * r2
        if abs(x4 - x2 * r1 * r2) < tol:
            print("Pattern: linear ratio progression (factorial-like)")
            return x2 * r1

    # fallback
    print("Pattern: fallback (no known pattern)")
    # use the first geometric-root solution
    sqrtD = math.sqrt(max(D,0))
    z2    = (w + sqrtD)/2
    z1    = w - z2
    return x2 + z1


# --- Test ---
if __name__ == "__main__":
    print(find_middle(7,11, 35, 67))   # → Pattern: linear ratio progression (factorial-like), returns 6


