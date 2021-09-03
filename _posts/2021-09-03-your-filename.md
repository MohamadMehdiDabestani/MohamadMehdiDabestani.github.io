---
published: false
---
![SOLID-design-pattern]({{site.baseurl}}/{{site.baseurl}}/image/jukan-tateisi-bJhT_8nbUA0-unsplash.jpg)
## الگوی solid چیست
حتما تاحالا شده که از پله بالا برین شما یکی یکی اصولا بالا میرین و تا به بالا برسین خب حالا نقش هر پله ایجا چیه ؟ چیزی نیست چز اینکه شما رو یک پله بالا تر ببره یک پله نمیتونه شما رو دوتا پله بالا ببره و فقط یه مسئولیت داره ولی حالا اگر برد چی ؟ خب اینجا داره هم فشار اضافه روی زانوی شما میاد برای بالا رفتن پس این پله ی درستی نیست . الگوی solid میاد و میگه که این پله کلا اینجوری نباید باشه و فقط باید به اندازه ی یک پله شما رو بالا ببره خب حالا این الگو توی برنامه نویسی به چه دردی میخوره ؟ الگوی solid توی برنامه نویسی میاد و میگه که ما باید یک متد رو جوری بنویسیم که فقط و فقط یک کار رو انجام بده و برای اینکه این اصول رو درست درک کنید بریم یک مثالی رو بزنیم .
خب اول ازهمه یک پروژه ی کنسولی ایجاد میکنیم . بعد ما نیاز به یک کلاس product داریم و به همراه 2 تا enum که در زیر مشاهده میکنید :

   <ol>
        <li> public enum Color { Red, Green, Blue } </li>
        <li>     public enum Size { Small, Medium, Large } </li>
        <li>     public class Product </li>
        <li>     { </li>
        <li>         public string Name; </li>
        <li>         public Color Color; </li>
        <li>         public Size Size; </li>
        <li>         public Product(string name, Color color, Size size) </li>
        <li>         { </li>
        <li>             Name = name ?? throw new ArgumentNullException(paramName: nameof(name)); </li>
        <li>             Color = color; </li>
        <li>             Size = size; </li>
        <li>         } </li>
        <li>     } </li>
    </ol>
خب حالا یک interface نیاز داریم که کاربردش رو وقتی میفهمید که کارما تموم شده باشه بعد دیگه خیلی راحت میتونید توی پروژه هاتون استفاده کنید پس خوب دقت کنید.
<ol>
            <li> public interface ISpecification<T> </li>
            <li> { </li>
            <li>     bool IsSatisfied(Product p); </li>
            <li> } </li>
    </ol>
این از interface ما حالا بریم ازش استفاده کنیم . من اول از همه میخام که محصولاتم رو بر اساس رنگشون فیالتر کنم پس از interface ی ISpecification اینجوری استفاده میکنم .
<ol>
            <li>public class ColorSpecification : ISpecification<Product> </li>
            <li>{ </li>
            <li>    private Color color; </li>
            <li>    public ColorSpecification(Color color) </li>
            <li>    { </li>
            <li>        this.color = color; </li>
            <li>    } </li>
            <li>    public bool IsSatisfied(Product p) </li>
            <li>    { </li>
            <li>        return p.Color == color; </li>
            <li>    } </li>
            <li>} </li>
    </ol>
من فقط کافیه که product و رنگ مورد نظرم رو بهش پاس بدم تا بگه بهم اون رنگ داره یا نه. حالا نیاز به یک interface دارم که از کلاس بالایی استفاده کنم .
<ol>
        <li>public interface IFilter
        <li>{ </li>
        <li> IEnumerable<T> Filter(IEnumerable<T> items, ISpecification
        <li> spec); </li>
        <li>} </li>
</ol>
  اینم از interface خب حالا باید کلاس زیر رو تعریف کنیم 
<ol>
    <li>public class BetterFilter : IFilter<Product> </li>
    <li>    {</li>
    <li>        public IEnumerable<Product> Filter(IEnumerable<Product> items, ISpecification<Product> spec)</li>
    <li>        {</li>
    <li>            foreach (var i in items)</li>
    <li>                if (spec.IsSatisfied(i))</li>
    <li>                    yield return i;</li>
    <li>        }</li>
    <li>    }</li>
</ol>
توی این کلاس فقط کافیه که لیست کالاهامون رو بدیم به همراه فیلتر مورد نظر بعد هم کالاهای فیلتر شده رو بهمون برمیگردونه حالا وقتشه که از متد های تعریف شده استفاده کنیم. من لیست کالاهارو اینجوری تعریف میکنم : 
   <ol>
    <li>var apple = new Product("Apple", Color.Red, Size.Small);</li>
    <li>var house = new Product("House", Color.Blue, Size.Large);</li>
    <li>var car = new Product("Car", Color.Green, Size.Medium);</li>
    <li>Product[] products = { apple, house, car };</li>
   </ol>
بعد از کلاس BetterFilter یک نمونه میسازم : 
1.var filter = new BetterFilter();
بعد هم اینجوری ازش استفاده میکنم : 
 <ol>
        <li>Console.WriteLine("products filter by red color");</li>
        <li>foreach (var item in filter.Filter(products, new ColorSpecification(Color.Red)))</li>
        <li>{</li>
        <li> Console.WriteLine($" --name :{item.Name}");</li>
        <li>}</li>
    </ol>

  حالا چرا متد Filter که از شعی ی filter میاد کلاس ColorSpecification رو قبول کرد ؟ در حالی که ما توی interface ی IFilter این کلاس رو دریافت نکرده بودیم و interface ی ISpecification رو دریافت کرده بودیم . این به دلیل اینه که ما توی کلاس ColorSpecification از intarface ی ISpecification ارث بری کرده بودیم پس میشه بهش پاس داد.
خب حالا اگر درست رفته باشید راه رو باید محصول Apple رو بهمون نشون بده.
حالا من میخام که بیام و کالاهارو بر اساس سایزشون فیلتر کنم پس کلاس زیر رو درست میکنم :
<ol>
  <li>public class SizeSpecification : ISpecification<Product> </li>   
    <li>{</li>
  <li> private Size size;</li>
 <li>public SizeSpecification(Size _size)</li>    
  <li>{</li>
  	<li>this.size = _size;</li>
  <li>}</li>
  <li>public bool IsSatisfied(Product p)</li>     
   <li>{</li>
   		<li>return p.Size == size;</li>         
   <li>}</li>
<li>}</li>
  </ol>
و بعد هم خیلی راحت برای فیلتر کردن کالا ها از کد زیر اسفاده میکنم : 
  <ol>
    <li>Console.WriteLine("products filter by small size");</li>
    <li>foreach (var item in filter.Filter(products, new SizeSpecification(Size.Large)))</li>
    <li>{</li>     
    
    <li>
      Console.WriteLine($"  --name :{item.Name}");
    </li> 
            <li>}</li>
  </ol>
پس باید محصول House رو بهم بده . درست هم داره کار میکنه . اگر جاییش رو نفهمیدین توی تلگرام بهم پیام بدین . 
تاریخ ثبت : 1400/5/12