﻿// <auto-generated />
using System;
using Lab1_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(LibrariaContext))]
    [Migration("20240921190832_refreshTokenAccessToken")]
    partial class refreshTokenAccessToken
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Lab1_Backend.Models.Autori", b =>
                {
                    b.Property<int>("AutoriID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AutoriID"));

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AutoriID");

                    b.ToTable("Autori");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Gjuha", b =>
                {
                    b.Property<int>("GjuhaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GjuhaID"));

                    b.Property<string>("gjuha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GjuhaID");

                    b.ToTable("Gjuha");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Kategoria", b =>
                {
                    b.Property<int>("KategoriaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KategoriaID"));

                    b.Property<string>("kategoria")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("KategoriaID");

                    b.ToTable("Kategoria");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Klienti", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Emri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KlientiGjinia")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KlientiQyteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KlientiRoli")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mbiemri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Klienti");
                });

            modelBuilder.Entity("Lab1_Backend.Models.KlientiGjinia", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Gjinia")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("KlientiGjinia");
                });

            modelBuilder.Entity("Lab1_Backend.Models.KlientiQyteti", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Qyteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("KlientiQyteti");
                });

            modelBuilder.Entity("Lab1_Backend.Models.KlientiRoli", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Roli")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("KlientiRoli");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Libri", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("AutoriID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<double>("Cmimi")
                        .HasColumnType("float");

                    b.Property<int?>("GjuhaID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("ISBN")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImgPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("KategoriaID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int>("NrFaqeve")
                        .HasColumnType("int");

                    b.Property<string>("Pershkrimi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Sasia")
                        .HasColumnType("int");

                    b.Property<int?>("ShtepiaBotueseID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Titulli")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VitiPublikimit")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("AutoriID");

                    b.HasIndex("GjuhaID");

                    b.HasIndex("KategoriaID");

                    b.HasIndex("ShtepiaBotueseID");

                    b.ToTable("Libri");
                });

            modelBuilder.Entity("Lab1_Backend.Models.MjeteShkollore", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<double>("Cmimi")
                        .HasColumnType("float");

                    b.Property<string>("ImgPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pershkrimi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProdhuesiMShID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int>("Sasia")
                        .HasColumnType("int");

                    b.Property<int?>("ShtetiMShID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("TipiID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("ProdhuesiMShID");

                    b.HasIndex("ShtetiMShID");

                    b.HasIndex("TipiID");

                    b.ToTable("MjeteShkollore");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Porosia", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<double>("CmimiTotal")
                        .HasColumnType("float");

                    b.Property<DateTime>("Data")
                        .HasColumnType("datetime2");

                    b.Property<int>("KlientiID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("KlientiID");

                    b.ToTable("Porosia");
                });

            modelBuilder.Entity("Lab1_Backend.Models.ProdhuesiMSh", b =>
                {
                    b.Property<int>("ProdhuesiMShID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProdhuesiMShID"));

                    b.Property<string>("Prodhuesi")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProdhuesiMShID");

                    b.ToTable("ProdhuesiMSh");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Produkti", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("LibriID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int?>("MjeteShkolloreID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<int>("PorosiaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("LibriID");

                    b.HasIndex("MjeteShkolloreID");

                    b.HasIndex("PorosiaID");

                    b.ToTable("Produkti");
                });

            modelBuilder.Entity("Lab1_Backend.Models.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ExpiresAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsRevoked")
                        .HasColumnType("bit");

                    b.Property<bool>("IsUsed")
                        .HasColumnType("bit");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("Lab1_Backend.Models.ShtepiaBotuese", b =>
                {
                    b.Property<int>("ShtepiaBotueseID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShtepiaBotueseID"));

                    b.Property<string>("shtepiaBotuese")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ShtepiaBotueseID");

                    b.ToTable("ShtepiaBotuese");
                });

            modelBuilder.Entity("Lab1_Backend.Models.ShtetiMSh", b =>
                {
                    b.Property<int>("ShtetiMShID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShtetiMShID"));

                    b.Property<string>("shteti")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ShtetiMShID");

                    b.ToTable("ShtetiMSh");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Tipi", b =>
                {
                    b.Property<int>("TipiID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TipiID"));

                    b.Property<string>("tipi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TipiID");

                    b.ToTable("Tipi");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Libri", b =>
                {
                    b.HasOne("Lab1_Backend.Models.Autori", "Autori")
                        .WithMany()
                        .HasForeignKey("AutoriID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lab1_Backend.Models.Gjuha", "Gjuha")
                        .WithMany()
                        .HasForeignKey("GjuhaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lab1_Backend.Models.Kategoria", "Kategoria")
                        .WithMany()
                        .HasForeignKey("KategoriaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lab1_Backend.Models.ShtepiaBotuese", "ShtepiaBotuese")
                        .WithMany()
                        .HasForeignKey("ShtepiaBotueseID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Autori");

                    b.Navigation("Gjuha");

                    b.Navigation("Kategoria");

                    b.Navigation("ShtepiaBotuese");
                });

            modelBuilder.Entity("Lab1_Backend.Models.MjeteShkollore", b =>
                {
                    b.HasOne("Lab1_Backend.Models.ProdhuesiMSh", "ProdhuesiMSh")
                        .WithMany()
                        .HasForeignKey("ProdhuesiMShID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lab1_Backend.Models.ShtetiMSh", "ShtetiMSh")
                        .WithMany()
                        .HasForeignKey("ShtetiMShID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lab1_Backend.Models.Tipi", "Tipi")
                        .WithMany()
                        .HasForeignKey("TipiID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProdhuesiMSh");

                    b.Navigation("ShtetiMSh");

                    b.Navigation("Tipi");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Porosia", b =>
                {
                    b.HasOne("Lab1_Backend.Models.Klienti", "Klienti")
                        .WithMany()
                        .HasForeignKey("KlientiID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Klienti");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Produkti", b =>
                {
                    b.HasOne("Lab1_Backend.Models.Libri", "Libri")
                        .WithMany()
                        .HasForeignKey("LibriID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lab1_Backend.Models.MjeteShkollore", "MjeteShkollore")
                        .WithMany()
                        .HasForeignKey("MjeteShkolloreID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Lab1_Backend.Models.Porosia", "Porosia")
                        .WithMany("Produktet")
                        .HasForeignKey("PorosiaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Libri");

                    b.Navigation("MjeteShkollore");

                    b.Navigation("Porosia");
                });

            modelBuilder.Entity("Lab1_Backend.Models.RefreshToken", b =>
                {
                    b.HasOne("Lab1_Backend.Models.Klienti", "User")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Klienti", b =>
                {
                    b.Navigation("RefreshTokens");
                });

            modelBuilder.Entity("Lab1_Backend.Models.Porosia", b =>
                {
                    b.Navigation("Produktet");
                });
#pragma warning restore 612, 618
        }
    }
}
