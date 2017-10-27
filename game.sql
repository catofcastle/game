-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Окт 27 2017 г., 13:16
-- Версия сервера: 5.7.20-0ubuntu0.16.04.1
-- Версия PHP: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `game`
--

-- --------------------------------------------------------

--
-- Структура таблицы `winners`
--

CREATE TABLE `winners` (
  `id` int(9) NOT NULL,
  `name` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `score` int(9) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `winners`
--

INSERT INTO `winners` (`id`, `name`, `score`, `date`) VALUES
(1, 'Denis', 4, '2017-10-26'),
(2, 'Denis', 4, '2017-10-26'),
(3, 'Oblivion', 6, '2017-10-27'),
(4, 'Marginal', 4, '2017-10-27');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `winners`
--
ALTER TABLE `winners`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `winners`
--
ALTER TABLE `winners`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
