---
title: "Rust beni neden heyecanlandırıyor?"
description: ""
category: rust
---
Kod yazmaya 2000 yılında C ile başladım. Yıl 2020 oldu ve bir programlama dili beni yeniden heyecanlandırıyor. Bu duyguyu en son 2012 yılında Scala ile yaşamıştım.

Aslında Commodore 64 ile büyüyen nesile yaş itibariyle dahil olsam da sosyal nedenlerle bilgisayarla üniversitede tanıştım. Birinci sınıfın ikinci döneminde, programlama dersinde C görmeye başlamıştık. O ara eve bilgisayar alındı. İlk kodumu yazıp çalıştırdıktan sonra aldığım hazzı ve "*Ben bunun için doğmuşum*" dediğimi dün gibi hatırlıyorum. Sonrasında kişisel projelerime C++ ile devam ettim. 2004 yılında yaptığım bitirme projem, o zamanlar çok yeni kavramlar olan internet üzerinden sıkıştırılmış görüntü ve ses iletimi üzerineydi ve projeyi *Borland C++ Builder* ile yazmıştım. Hatta 2006-2008 arası geliştirdiğim ilk açık kaynak projem [termula2x](https://sourceforge.net/projects/termula2x) için de C++ kullanmıştım.

Profesyonel kariyerimde ise ilk birkaç ay C# yazdıktan sonra 2006 yılından itibaren Java kullanmaya başladım. 2013 yılından beri ağırlıklı olarak Scala yazıyorum ama iki dili de hemen hemen her gün kullanıyorum. Ara ara javascript, coffeescript, php, python, perl yazdığım da oldu ama bu dilleri hiçbir zaman uzun süreli ve derinlemesine öğrenerek kullanmadım.

Hem kişisel hem de profesyonel projelerimde kullandığım dillere bakınca elimin altında her zaman statik bir tip sistemi olduğu kolayca görülüyor. An itibariyle en çok sevdiğim ve kendimi en rahat hissettiğim dil olan scala da çok güçlü bir tip sistemine sahip. Bunun yanında fonksiyonel programlamadan gelen immutability, referential transparency, higher order functions, pattern matching gibi kavramlar da günlük programlama deneyimimin bir parçası.

Son 7 yıldır mikroservis mimarisi ile yüksek yük altında çalışan backend servisler geliştiriyorum. Dolayısıyla parallelism, concurrency, distributed computing kavramları günlük işlerim arasında. Bu noktada Scala ve ekosisteminden gelen dil  ve kütüphane bileşenleri hayatımı çok kolaylaştırıyor. Asenkron işlemler backpressure desteğiyle elimin altında. Stream processing 5 dakikada yazabildiğim fluent api çağrılarından ibaret. Özetle kullandığım araçlar açısından keyfim **neredeyse** yerinde.

Yukarıda toz pembe bir tablo çizdim ama elbette her şey mükemmel değil. Örneğin scala compiler hala çok yavaş. Elimizdeki çok güçlü makinalara ve optimize edilmiş derleyiciye rağmen yavaş. Evet, scala compiler bizim için çok fazla iş yapıyor. Production'da karşılaşılabilecek hataları en aza indiriyor. Fakat bu yavaşlık geliştirici verimliliğini mutlaka etkiliyor. Dürüst olmak gerekirse daha hızlı bir derleyiciye hayır demezdim.

Diğer bir sorun da yıllardır optimize edilmesine rağmen hala sorun çıkartan garbage collector. Scala ile yazdığım kod JVM üzerinde çalışıyor. JVM tuning zaten bir tür sihirbazlık. Ne yaparsanız yapın gc latency sizi bir yerde yakalıyor. Garbage collection olmayan ama bellek yönetiminde aynı güvenceyi sağlayan bir ortama hayır demezdim.

Dediğim gibi scala ile yazdığım kod java virtual machine üzerinde çalışıyor. Bu da hem sisteme fazladan araçların kurulması hem de gereksiz işlem yükü anlamına geliyor. Gerçi artık scala ve java için native kod üreten araçlar mevcut ama hepsi henüz çok erken safhada. Kararlı bir şekilde native kod üreten bir programlama diline hayır demezdim.

#### Ve insan Rust’ı yarattı...
Garbage collector olmadan otomatik bellek yönetimini garanti eden, native kod üreten görece hızlı bir derleyiciye sahip, kolayca asenkron kod yazmaya imkan veren, gelişmiş bir tip sistemi ve genericler de dahil olmak üzere yukarıda saydığım dil özelliklerine sahip bir programlama dili Rust. Daha baştan paket yönetimini düzgünce çözmesinin yanında gelişmiş araç ve dokümantasyon desteği ile giriş aşaması da çok kolay. Bu yüzden her gün yavaş yavaş Rust öğrenmek bana çok keyif veriyor.

Bu günlükte bir yandan ben Rust öğrenmeye devam ederken her sabah kısa kısa ilgimi çeken, hoşuma giden şeylerden bahsedeceğim. Bu formatı [Sağlıklı Yaşam](/saglikli-yasam.html) yazılarında kullanmıştım ve çok beğenmiştim. Yarın görüşmek üzere👋
