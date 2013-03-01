
/****** Object:  Database [FoxCode]    Script Date: 02/26/2013 18:09:38 ******/
CREATE DATABASE [FoxCode] ON  PRIMARY 
( NAME = N'FoxCode', FILENAME = N'D:\Data\FoxCode.mdf' , SIZE = 2048KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FoxCode_log', FILENAME = N'D:\Data\FoxCode_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FoxCode] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FoxCode].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FoxCode] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [FoxCode] SET ANSI_NULLS OFF
GO
ALTER DATABASE [FoxCode] SET ANSI_PADDING OFF
GO
ALTER DATABASE [FoxCode] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [FoxCode] SET ARITHABORT OFF
GO
ALTER DATABASE [FoxCode] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [FoxCode] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [FoxCode] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [FoxCode] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [FoxCode] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [FoxCode] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [FoxCode] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [FoxCode] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [FoxCode] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [FoxCode] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [FoxCode] SET  DISABLE_BROKER
GO
ALTER DATABASE [FoxCode] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [FoxCode] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [FoxCode] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [FoxCode] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [FoxCode] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [FoxCode] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [FoxCode] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [FoxCode] SET  READ_WRITE
GO
ALTER DATABASE [FoxCode] SET RECOVERY SIMPLE
GO
ALTER DATABASE [FoxCode] SET  MULTI_USER
GO
ALTER DATABASE [FoxCode] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [FoxCode] SET DB_CHAINING OFF
GO
USE [FoxCode]
GO
/****** Object:  User [user]    Script Date: 02/26/2013 18:09:38 ******/
CREATE USER [user] FOR LOGIN [user] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 02/26/2013 18:09:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryPK] [int] IDENTITY(1,1) NOT NULL,
	[Category] [varchar](30) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[LastChangedBy] [int] NULL,
	[LastChangedDate] [datetime] NULL,
	[TimeStamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryPK] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Category] ON
INSERT [dbo].[Category] ([CategoryPK], [Category], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (1, N'Personal', CAST(0x0000A170017B5E89 AS DateTime), NULL, NULL)
INSERT [dbo].[Category] ([CategoryPK], [Category], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (2, N'Buisness', CAST(0x0000A170017B7945 AS DateTime), NULL, NULL)
INSERT [dbo].[Category] ([CategoryPK], [Category], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (3, N'School', CAST(0x0000A170017B8BCE AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Category] OFF
/****** Object:  Table [dbo].[User]    Script Date: 02/26/2013 18:09:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[UserPK] [int] IDENTITY(1,1) NOT NULL,
	[LoginName] [varchar](20) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Password] [varchar](20) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[LastChangedBy] [int] NULL,
	[LastChangedDate] [datetime] NULL,
	[TimeStamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserPK] ASC
)WITH (PAD_INDEX  = ON, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON, FILLFACTOR = 1) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON
INSERT [dbo].[User] ([UserPK], [LoginName], [FirstName], [LastName], [Password], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (1, N'ltowers', N'Logan', N'Towers', N'12345', CAST(0x0000A170017A824B AS DateTime), NULL, NULL)
INSERT [dbo].[User] ([UserPK], [LoginName], [FirstName], [LastName], [Password], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (2, N'ppaquette', N'Patrice', N'Paquette', N'54321', CAST(0x0000A170017AC1BC AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[User] OFF
/****** Object:  Table [dbo].[Type]    Script Date: 02/26/2013 18:09:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Type](
	[TypePK] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](30) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[LastChangedBy] [int] NULL,
	[LastChangedDate] [datetime] NULL,
	[TimeStamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_Type] PRIMARY KEY CLUSTERED 
(
	[TypePK] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Type] ON
INSERT [dbo].[Type] ([TypePK], [Type], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (1, N'Appointment', CAST(0x0000A170017C1F75 AS DateTime), NULL, NULL)
INSERT [dbo].[Type] ([TypePK], [Type], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (2, N'Meeting', CAST(0x0000A170017C2469 AS DateTime), NULL, NULL)
INSERT [dbo].[Type] ([TypePK], [Type], [CreatedDate], [LastChangedBy], [LastChangedDate]) VALUES (3, N'Pickup/Drop off', CAST(0x0000A170017C47DA AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Type] OFF
/****** Object:  Table [dbo].[Event]    Script Date: 02/26/2013 18:09:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Event](
	[EventPK] [int] IDENTITY(1,1) NOT NULL,
	[UserFK] [int] NOT NULL,
	[CategoryFK] [int] NOT NULL,
	[TypeFK] [int] NOT NULL,
	[Subject] [varchar](100) NOT NULL,
	[Location] [varchar](100) NULL,
	[Description] [varchar](1000) NULL,
	[Important] [bit] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[LastChangedBy] [datetime] NULL,
	[TimeStamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[EventPK] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Event] ON
INSERT [dbo].[Event] ([EventPK], [UserFK], [CategoryFK], [TypeFK], [Subject], [Location], [Description], [Important], [CreatedDate], [LastChangedBy]) VALUES (1, 1, 3, 2, N'FoxCode design meeting', N'Via the internet', N'This is a meeting to discuss the next step of the design.', 0, CAST(0x0000A170017CFD58 AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Event] OFF
/****** Object:  Default [DF_Category_CreatedDate]    Script Date: 02/26/2013 18:09:39 ******/
ALTER TABLE [dbo].[Category] ADD  CONSTRAINT [DF_Category_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_User_CreatedDate]    Script Date: 02/26/2013 18:09:39 ******/
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Type_CreatedDate]    Script Date: 02/26/2013 18:09:39 ******/
ALTER TABLE [dbo].[Type] ADD  CONSTRAINT [DF_Type_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Event_CreatedDate]    Script Date: 02/26/2013 18:09:39 ******/
ALTER TABLE [dbo].[Event] ADD  CONSTRAINT [DF_Event_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  ForeignKey [FK_Event_Category]    Script Date: 02/26/2013 18:09:39 ******/
ALTER TABLE [dbo].[Event]  WITH CHECK ADD  CONSTRAINT [FK_Event_Category] FOREIGN KEY([CategoryFK])
REFERENCES [dbo].[Category] ([CategoryPK])
GO
ALTER TABLE [dbo].[Event] CHECK CONSTRAINT [FK_Event_Category]
GO
/****** Object:  ForeignKey [FK_Event_Type]    Script Date: 02/26/2013 18:09:39 ******/
ALTER TABLE [dbo].[Event]  WITH CHECK ADD  CONSTRAINT [FK_Event_Type] FOREIGN KEY([TypeFK])
REFERENCES [dbo].[Type] ([TypePK])
GO
ALTER TABLE [dbo].[Event] CHECK CONSTRAINT [FK_Event_Type]
GO
/****** Object:  ForeignKey [FK_Event_User]    Script Date: 02/26/2013 18:09:39 ******/
ALTER TABLE [dbo].[Event]  WITH CHECK ADD  CONSTRAINT [FK_Event_User] FOREIGN KEY([UserFK])
REFERENCES [dbo].[User] ([UserPK])
GO
ALTER TABLE [dbo].[Event] CHECK CONSTRAINT [FK_Event_User]
GO
