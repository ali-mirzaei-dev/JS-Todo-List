# JS-Todo-List | State-Driven Task Manager

A fully interactive, responsive To-Do List application built entirely with vanilla JavaScript. This project simulates a real-world productivity app (like Todoist or TickTick), featuring a custom state management system, LocalStorage persistence, nested dropdown menus, and a sleek UI with dark mode.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Author](#author)

## Demo
[Live Demo](https://ali-mirzaei-dev.github.io/JS-Todo-List/)


## Features

- **State-Driven DOM | رابطه کاربری مبتنی بر وضعیت:**  
  *رابط کاربری کاملاً از HTML جدا شده است. یک آرایه `tasks` به عنوان منبع حقیقت عمل کرده و تابع `renderTask()` با هر تغییر وضعیت، لیست را به صورت پویا بازسازی می‌کند.*

- **LocalStorage Persistence | ذخیره‌سازی در حافظه مرورگر:**  
  *وظایف، زباله‌دان، تم کاربر و تنظیمات زبان در LocalStorage مرورگر ذخیره می‌شوند. برنامه پس از رفرش صفحه، وضعیت خود را بازسازی می‌کند.*

- **Nested Dropdown Menus | منوهای کشویی تودرتو:**  
  *منوهای کشویی سفارشی و پویا با قابلیت بسته شدن هنگام کلیک در خارج از منو.*

- **Priority & Sorting System | سیستم اولویت‌بندی و مرتب‌سازی:**  
  *امکان تعیین اولویت بالا، متوسط یا پایین برای وظایف، همراه با نشانگرهای رنگی و مرتب‌سازی بر اساس اولویت.*

- **Pin to Top | سنجاق کردن وظایف:**  
  *امکان سنجاق کردن وظایف مهم به بالای لیست همراه با یک نشانگر اختصاصی.*

- **Archive/Trash System | سیستم زباله‌دان:**  
  *وظایف حذف‌شده به زباله‌دان منتقل می‌شوند و امکان بازیابی یا حذف دائمی آن‌ها وجود دارد.*

- **Inline Editing | ویرایش درجا:**  
  *امکان ویرایش مستقیم وظایف در محل نمایش آن‌ها، با جلوگیری از باز شدن هم‌زمان چند ورودی ویرایش.*

- **Custom Modals & Toasts | مودال‌ها و نوتیفیکیشن‌های سفارشی:**  
  *چک‌باکس‌های سفارشی با CSS، پنجره‌های تأیید حذف و اعلان‌های بازخورد به کاربر.*

- **Dark Mode | حالت تاریک:**  
  *قابلیت تغییر بین تم روشن و تاریک با استفاده از متغیرهای CSS و ذخیره تنظیمات در LocalStorage.*

- **Bilingual Support (EN/FA) | پشتیبانی دو زبانه:**  
  *پشتیبانی از زبان‌های انگلیسی و فارسی با تغییر خودکار چیدمان بین راست‌به‌چپ (RTL) و چپ‌به‌راست (LTR).*

- **Responsive Design | طراحی واکنش‌گرا:**  
  *نوار کناری کشویی که در موبایل به‌صورت پوششی تمام‌صفحه و در دسکتاپ به‌صورت یک ستون ثابت نمایش داده می‌شود.*


## Screenshots

<table>
  <tr>
    <td width="50%">
      <img src="assets/Images/ScreenshotLightUI.png" alt="Light Mode Inbox" width="100%">
    </td>
    <td width="50%">
      <img src="assets/Images/ScreenshotDarkUI.png" alt="Dark Mode Settings" width="100%">
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <img src="assets/Images/ScreenshotFaVersion.png" alt="Farsi RTL Layout" width="100%">
    </td>
  </tr>
</table>

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML 5 | Semantic markup & DOM structure |
| Tailwind CSS | Utility-first styling, responsive layout, and RTL support |
| JavaScript | State management, DOM manipulation, and event handling |

## Project Structure

```text

## Project Structure

```text
JS-Todo-List/
│
├── assets/
│   ├── Font/
│   ├── Images/
│   │ 
│   ├── JavaScript/
│   │   └── main.js
│   │ 
│   └── StyleSheet/
│       ├── master.css
│       └── output.css
│
└── index.html

```

## Author

**Ali Mirzaei** – Frontend Developer

- [GitHub](https://github.com/ali-mirzaei-dev)
- [LinkedIn](https://www.linkedin.com/in/ali-mirzaei-dev/)
- [Instagram](https://instagram.com/ali.mirzaei.dev)
- [ali.mirzaei.kt@gmail.com](mailto:ali.mirzaei.kt@gmail.com)