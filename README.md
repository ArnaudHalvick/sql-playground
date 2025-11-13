# 🎯 SQL Playground

> **Learn SQL the fun way!** An interactive SQL learning platform where you can practice queries, tackle challenges, and master database skills through hands-on experience.

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

**Video Presentation:** [Watch on YouTube](https://youtu.be/uPUUJFIIJhc)

## ✨ Features

### 🎯 Interactive Learning

- **SQL Editor** with syntax highlighting and auto-completion
- **Real-time query execution** with instant results
- **20+ curated exercises** from beginner to advanced
- **Database schema explorer** to understand table relationships

### 🎮 Challenge Mode

- **Data quality challenges** with intentional errors to find and fix
- **AI-powered challenge generator** with custom difficulty levels
- **Realistic scenarios** like e-commerce data validation
- **Configurable error rates** (2-25%) for progressive difficulty

### 🛠️ Flexible Database Setup

- **One-click database setup** with multiple configurations
- **Realistic datasets** with 50-2000+ records
- **Challenge databases** with data quality issues
- **Custom configurations** for specific learning goals

### 🎨 Modern UI/UX

- **Clean, responsive design** that works on all devices
- **Dark/light mode** support
- **Intuitive navigation** with tabs and organized sections
- **Real-time feedback** and error handling

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/ArnaudHalvick/sql-playground.git
   cd sql-playground
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment** ⚠️ **Service role key required!**

   ```bash
   # Copy the template
   cp .env.local.example .env.local

   # Fill in your Supabase credentials:
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Essential for DB setup!
   ```

4. **Start the app**

   ```bash
   npm run dev
   ```

5. **Setup database** (click "Setup Database" in the app or use CLI)
   ```bash
   npm run db:setup-medium  # Clean dataset
   npm run db:challenge-light  # With data quality issues
   ```

> **💡 Why service role key?** The app needs admin privileges to create tables, insert sample data, and set up the query execution function. Without it, database setup won't work!

## 🎯 Learning Path

### 🟢 Beginner (Start Here!)

- Basic SELECT queries and filtering
- Understanding table relationships
- Simple JOINs and aggregations

### 🟡 Intermediate (Level Up!)

- Complex JOINs and subqueries
- GROUP BY and HAVING clauses
- Date functions and data analysis

### 🔴 Advanced (Master Level!)

- Window functions and CTEs
- Data quality validation
- Performance optimization
- Real-world problem solving

## 🎮 Challenge Examples

### Find Invalid Emails

```sql
SELECT first_name, last_name, email
FROM users
WHERE email NOT LIKE '%@%.com'
   OR email NOT LIKE '%@%.net'
   OR email NOT LIKE '%@%.org';
```

### Detect Pricing Anomalies

```sql
SELECT name, price,
  CASE
    WHEN price < 0 THEN 'Negative price'
    WHEN price = 0 THEN 'Zero price'
    WHEN price > 10000 THEN 'Suspiciously high'
  END as issue
FROM products
WHERE price <= 0 OR price > 10000;
```

### Delivery Logic Violations

```sql
SELECT id, status, delivery_date
FROM orders
WHERE status = 'delivered' AND delivery_date IS NULL;
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS, shadcn/ui
- **Editor**: CodeMirror with SQL syntax highlighting
- **Icons**: Lucide React

## 📊 Database Schema

Complete e-commerce database with:

- **Users** (customers with profiles)
- **Products** (catalog with categories)
- **Orders** (purchase history)
- **Order Items** (detailed line items)
- **Countries & Cities** (location data)

Perfect for learning JOINs, aggregations, and real-world queries!

---

## 🔍 SEO Relevance Note

While this was built as a learning project, the database architecture skills demonstrated here are directly applicable to **technical SEO for e-commerce**:

- **Query optimization** impacts site performance and Core Web Vitals (ranking factors)
- **Schema design** influences how easily you can build SEO-friendly URL structures
- **Table relationships** affect the scalability of large product catalogs (10k+ SKUs)
- **Data modeling** determines whether filter combinations create crawl budget issues

If you're interested in how I apply technical skills to solve SEO problems, check out my [SEO Workshop](https://github.com/ArnaudHalvick/SEO-Workshop) which focuses specifically on technical + strategic SEO solutions.

---

## 🎯 Use Cases

- **Students** learning SQL fundamentals
- **Developers** practicing database skills
- **Data analysts** honing query techniques
- **Educators** teaching SQL concepts
- **Job seekers** preparing for technical interviews

## 🤝 Contributing

Found a bug? Have an idea? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning and teaching!

## 🙏 Acknowledgments

Built with love for the SQL learning community. Special thanks to:

- **Supabase** for the amazing database platform
- **shadcn/ui** for the beautiful component library
- **CodeMirror** for the powerful editor
- **Next.js** team for the incredible framework

---

**⭐ Star this repo if it helped you learn SQL!**

**Built by [Arnaud Halvick](https://arnaudhalvick.github.io/) - Full-Stack SEO Expert**

📧 halvick.arnaud@gmail.com | 💼 [Hire on Upwork](https://www.upwork.com/freelancers/~017740c356da4ab81f) (12k+ hours, 100% Job Success, Top Rated)
