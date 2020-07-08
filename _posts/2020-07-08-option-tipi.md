---
title: "Option tipi ile 1 milyar dolar cebimizde kalsın"
description: ""
category: rust
---
1965 yılında bizi null referanslar ile tanıştıran Tony Hoare, 2009 yılında yaptığı [şu konuşmada](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/) null referansları milyar dolarlık hata olarak nitelemişti. Bu sorunu çözmek için, başka bir deyişle null pointer hatası almamak için birçok dil Option tipi sunuyor. Option tipi aslında başka bir değeri sarmalayarak var veya yok durumlarını ifade etmeye yarıyor. 2012 yılında Scala yazmaya başladığımda bu tip mevcuttu. Java 8 ile 2014 yılında java geliştiriciler de -daha az yetenekli olsa bile- bu tiple tanıştılar. Rust dilinde Scala'dakinin yeteneklerine çok benzer bir Option tipi mevcut. Bu yazıda Option tipinin nasıl kullanılabileceğinden bahsetmeye çalışacağım.

Rust'ta [Option](https://doc.rust-lang.org/std/option/enum.Option.html) tipi aşağıdaki gibi bir enum olarak tanımlanmış. Eğer bir değer mevcut değilse None, mevcutsa Some ile ifade ediliyor.

```rust
pub enum Option<T> {
    None,
    Some(T),
}
```

Rust null referanslara izin vermiyor. Buna izin veren dillerde derleyici bizi null referans kontrolü için zorlamaz. Fakat Option tipi ile işlem yaparken derleyici bizi bu kontrolü yapmak zorunda bırakır. İlk kullanım örneği olarak [dokümantasyonda](https://doc.rust-lang.org/std/option/index.html) verilen partial function'dan başlamak istiyorum. Bu tür fonksiyonlar tüm girdiler için bir çıktı üretemezler. Mesela bölme işlemi yapan fonksiyonumuz bölünen ve böleni parametre olarak alıyor olsun. Bölme işlemi bölen 0 olduğunda tanımsız olduğundan fonksiyonumuz da bu girdi için tanımsızdır. Bu durumu ifade edebilmek için fonksiyonun dönüş tipini Option yapabiliriz ve bölen 0 olduğunda None dönebiliriz.

```rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}
```

Bu noktadan sonra divide fonksiyonunu çağıran kod None durumunu kontrol etmek zorunda. Bu kontrol için en temel yöntem pattern matching. Java'da pattern matching olmadığından Option tipi oldukça kullanışsız geliyordu. Rust, Scala'ya benzer şekilde bu özelliği sağladığından beni gayet mutlu etti.

```rust
// divide fonksiyonu bir Option dönüyor.
let result = divide(2.0, 3.0);

// Sonucu okuyabilmek için pattern matching kullanıyoruz.
match result {
    // Bölme işlemi başarılı
    Some(x) => println!("Sonuç: {}", x),
    // Bölme işlemi geçersiz
    None    => println!("0 ile bölünemez!"),
}
```

Rust, Scala kadar fonksiyonel programlamadan bahseden ve category theory'yi gözümüze sokan bir dil değil. Ortalama bir Scala geliştirici Option tipinin bir monad olduğunu bilir ve monad özelliklerini sağlamasını bekler. İşin güzel tarafı Rust monad kelimesinden hiç bahsetmeden bu özellikleri bize sunuyor. Bunlardan kısaca bahsetmeye çalışayım.

**map** metodu ile eğer option içinde bir değer varsa bu değere bir fonksiyon uygulayabiliyoruz. Örneğin bir string mevcut olduğunda uzunluğunu hesaplayan bir kod yazalım.

```rust
let maybe_name = Some(String::from("Fehmi Can Saglam"));
let maybe_len: Option<usize> = maybe_name.map(|name| name.len());
```

Yukarıdaki örnekte *maybe_len* değeri ancak *maybe_name* değeri mevcut olduğunda var olabileceğinden bu değerin tipi de bir Option oluyor. Eğer Option tipi kullanmıyor olsaydık name null olduğu durumda *name.len()* çağrısında null pointer exception alacaktık.

**and_then** metodu Scala'daki flatmap işlevini görüyor. Örneğin kullanıcı bilgisini aldıktan sonra adres bilgisini başka bir fonksiyon yardımıyla okuyan bir kod yazalım. Kullanıcı bilgisi bir şekilde okunamayacağı gibi adres bilgisi de mevcut olmayabilir. Tüm bu durumları Option tipi ve and_then metodu ile ifade edebiliriz.

```rust
struct User {
    id: i32,
    name: String
}

struct Address {
    user_id: i32,
    city: String,
    country: String,
}

fn get_user(id: i32) -> Option<User> {}

fn get_address(user_id: i32) -> Option<Address> {}

// Eğer 1 id'li kullanıcı mevcutsa, bu kullanıcının adresini yüklüyoruz.
let maybe_address: Option<Address> = get_user(1).and_then(|user| get_address(user.id));
```

Son olarak da **or_else** metodundan bahsetmek istiyorum. Kullanıcı bilgisini önce cache'ten, burada mevcut değilse veritabanından yüklemek istediğimizi düşünelim.

```rust
fn get_user_from_cache(id: i32) -> Option<User> {}

fn get_user_from_db(id: i32) -> Option<User> {}

let maybe_user: Option<User> = get_user_from_cache(1).or_else(|| get_user_from_db(1));
```

or_else metodunun lazy olması bu noktada önem arz ediyor. *get_user_from_db* fonksiyonu yalnızca kullanıcı cache'te mevcut değilse çağrılacak.

Ben de yeni yeni öğrendiğim için şu an daha kısa yolları bilmiyor olabilirim. Bunları zamanla öğrendikçe paylaşmaya çalışacağım. Yarın başka bir konu ile görüşmek üzere👋
