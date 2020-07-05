---
title: "std::convert dostumuzdur"
description: ""
category: rust
---
Bugün bahsedeceğim konuya Pascal Hertleif, [Writing Idiomatic Libraries in Rust](https://www.youtube.com/watch?v=0zOg8_B71gE) konuşması ile ilham verdi. Youtube'da ciddi miktarda Rust konulu içerik olduğunu farkettiğimden beri vakit buldukça izliyorum ve daha sonra yazmak üzere not alıyorum. Bu yüzden birçok yazımın kaynağı muhtemelen bu videolar olacak.

[std::convert](https://doc.rust-lang.org/std/convert/index.html) modülündeki traitler bir tipten başka bir tipe dönüşüme olanak sağlıyorlar. Örneğin [From](https://doc.rust-lang.org/std/convert/trait.From.html) trait ile bir değerden başka bir değere dönüşüm yapabiliyoruz. Hem de bu traiti gerçeklediğimizde [Into](https://doc.rust-lang.org/std/convert/trait.Into.html) trait de bizim için otomatik olarak gerçeklenmiş oluyor. Bu şekilde anlatınca hiçbir şey ifade etmemiş olabilir. Küçük bir örnekle açıklamaya çalışayım.

Point isminde bir veri yapımız olsun, bir noktanın x ve y koordinatlarını tutsun.

```rust
struct Point {
    x: i32,
    y: i32,
}
```

Yeni bir nokta tanımlamak için normalde aşağıdaki kodu kullanırız.

```rust
let p = Point { x: -1, y: 1 };
```

Diyelim ki elimizde noktanın koordinatlarını tutan iki elemanlı bir dizi var ve bu diziden Point tipinde bir değer yaratmak istiyoruz. Bu durumda From traitini gerçeklememiz yeterli oluyor.

```rust
impl From<[i32; 2]> for Point {
    fn from(coords: [i32; 2]) -> Self {
        Point { x: coords[0], y: coords[1] }
    }
}
```

Rust'in tip sistemi *[i32; 2]* şeklinde 2 elemanlı integer dizi tanımına izin veriyor. Harika değil mi?
Artık iki elemanlı bir diziden aşağıdaki şekilde bir nokta yaratabiliriz.

```rust
let p = Point::from([-1, 1]);
```

From traitini gerçekleyince Into traitinin de otomatik olarak gerçeklendiğinden bahsetmiştim. Böylece aşağıdaki şekilde de bir nokta yaratabiliyoruz. Bence bu hali gerçekten çok temiz oldu.

```rust
let p: Point = [-1, 1].into();
```

Benzer dönüşümleri [FromStr](https://doc.rust-lang.org/std/str/trait.FromStr.html) ile de yapabiliyoruz. Bu traiti implement edince string üzerinde *parse* metodunu çağırarak istediğimiz tipi elde edebiliyoruz. Örneğin renk belirten bir enum tanımlayalım.

```rust
enum Color {
    Red,
    Green,
    Blue,
}
```

Color için FromStr traitini gerçeklersek **"blue".parse::\<Color\>()** kodu ile stringden Color tipine dönüşüm mümkün oluyor.

```rust
impl FromStr for Color {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "red" => Ok(Color::Red),
            "green" => Ok(Color::Green),
            "blue" => Ok(Color::Blue),
            _ => Err(())
        }
    }
}
```

Parse işlemi elbette bazen başarısız olabilir. Ben bu örneği basit tutmak adına başarısızlık durumu için düzgün bir hata dönmek yerine unit adı verilen () döndüm.

Yarın başka bir konu ile görüşmek üzere👋


