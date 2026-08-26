---
title: "? operatörü ile hataları dönmek"
description: ""
category: rust
---
Hata bu işin fıtratında var🙂 Rust uygulamada oluşabilecek ve bir şekilde tepki verilebilecek hataları ifade etmek için [Result](https://doc.rust-lang.org/std/result/index.html) tipini kullanıyor. Bu tip Scala geliştiricilerin aşina olduğu Either ve biraz da Try tiplerine çok benziyor. Hataları bir tip ile ifade etmek dün bahsettiğim Option tipi ile null referansları ifade etmekle hemen hemen aynı. Bu tür durumları tip sistemi yardımıyla ifade ettiğinizde derleyici gözden bir şey kaçırmanıza engel oluyor.

Result da Option gibi bir enum olarak tanımlanmış ve Ok ile Err olmak üzere iki varyanttan oluşuyor. Ok varyantı ile başarılı durumda sonucu dönerken Err varyantı ile hatayı dönüyoruz.

```rust
enum Result<T, E> {
   Ok(T),
   Err(E),
}
```

Dünkü yazımda *get_user* ve *get_address* isminde Option dönen iki fonksiyon yazmıştım. Bunları Result tipine örnek vermek için değiştireceğim. Elbette örneği yine çok basit tutuyorum ama işin özünü gösterebileceğimi umuyorum. İki fonksiyonda da gelen id 1'den küçük mü kontrolü yaparak küçükse hata ve hata içinde bir mesaj dönüyorum.

```rust
fn get_user(id: i32) -> Result<User, String> {
    if id < 1 {
        Err(String::from("id 1'den küçük olamaz!"))
    } else {
        Ok(User { id, name: String::from("Fehmi Can Saglam") })
    }
}

fn get_address(user_id: i32) -> Result<Address, String> {
    if user_id < 1 {
        Err(String::from("user_id 1'den küçük olamaz!"))
    } else {
        Ok(Address { user_id, city: String::from("Berlin"), country: String::from("Almanya") })
    }
}
```

Hatırlarsanız bu iki fonksiyon çağrısı birbirine bağımlı idi. Önce kullanıcıyı yükledikten sonra işlem başarılı ise kullanıcı adresini yüklememiz bekleniyor. Bu işlemi yapan üçüncü bir fonksiyon tanımlayalım. Bu fonksiyon hata durumlarını kendisi ele almaktansa olduğu gibi dönsün. İlk yöntem olarak pattern matching kullanacağım.

```rust
fn get_user_address(id: i32) -> Result<Address, String> {
    let user = match get_user(id) {
        Ok(user) => user,
        Err(e) => return Err(e),
    };

    match get_address(user.id) {
        Ok(address) => Ok(address),
        Err(e) => Err(e)
    }
}
```

Tam olarak neye ihtiyacımız olduğunu gösterebilmek için yukarıdaki kodda işi epeyce uzattım. Yine pattern matching kullanarak aynı işi aşağıdaki gibi de yapabilirdik.

```rust
fn get_user_address(id: i32) -> Result<Address, String> {
    match get_user(id) {
        Ok(user) => get_address(user.id),
        Err(e) => Err(e)
    }
}
```

Bu kodu ? operatörü ile daha da sadeleştirmemiz mümkün. Bu operatör başarılı durumda ilgili değeri dönerken hata durumunda içinde bulunduğu tüm fonksiyondan hatayı return ediyor.

```rust
fn get_user_address(id: i32) -> Result<Address, String> {
    let user = get_user(id)?;
    get_address(user.id)
}
```

Birbirine bağımlı 3 fonksiyonumuz olsaydı ? operatörünün sağladığı kolaylık daha da görünür olurdu. Çünkü bu durumda iç içe match satırları yazmak yerine tek bir satır eklemek yeterli olacaktı.

Yarın başka bir konu ile görüşmek üzere👋




