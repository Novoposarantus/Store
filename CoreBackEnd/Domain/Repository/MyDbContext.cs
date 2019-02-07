using Domain.Model;
using Domain.Model.Chat;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Domain.Repository
{
	public class MyDbContext : DbContext
	{
		public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
		{
			Database.EnsureCreated();
		}

		public DbSet<RolePermission>	RolePermissions { get; set; }
		public DbSet<AccessUser>		AccessUsers		{ get; set; }
		public DbSet<Permission>		Permissions		{ get; set; }
		public DbSet<Product>			Products		{ get; set; }
		public DbSet<Client>			Clients			{ get; set; }
		public DbSet<User>				Users			{ get; set; }
		public DbSet<Role>				Roles			{ get; set; }
		public DbSet<Message>			Messages		{ get; set; }
		public DbSet<Chat>				Chats			{ get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

			modelBuilder.Entity<User>()
				.HasOne(p => p.Role);
			modelBuilder.Entity<RolePermission>()
				.HasKey(pc => new { pc.PermissionId, pc.RoleId });
			modelBuilder.Entity<RolePermission>()
				.HasOne(rp => rp.Role)
				.WithMany(r => r.RolePermissions)
				.HasForeignKey(rp => rp.RoleId);
			modelBuilder.Entity<RolePermission>()
				.HasOne(rp => rp.Permission)
				.WithMany(p => p.RolePermissions)
				.HasForeignKey(rp => rp.PermissionId);

			modelBuilder.Entity<Product>().HasData(
				new Product() { Id = 1, Name = "Iphone 7",		Category = "Phone", Price = 30000,	Exist = true,	Source = "Manual" },
				new Product() { Id = 2, Name = "Iphone 6s",		Category = "Phone", Price = 20000,	Exist = false,	Source = "Manual" },
				new Product() { Id = 3, Name = "Iphone 8",		Category = "Phone", Price = 40000,	Exist = true,	Source = "Manual" },
				new Product() { Id = 4, Name = "Iphone XS Max", Category = "Phone", Price = 100000, Exist = true,	Source = "Manual" },
				new Product() { Id = 5, Name = "Iphone X",		Category = "Phone", Price = 60000,	Exist = false,	Source = "Manual" },
				new Product() { Id = 6, Name = "Iphone XS",		Category = "Phone", Price = 80000,	Exist = true,	Source = "Manual" }
			);

			modelBuilder.Entity<Role>().HasData(
				new Role() { RoleId = 1, Name = "admin" },
				new Role() { RoleId = 2, Name = "user" },
				new Role() { RoleId = 3, Name = "chatModerator" }
			);

			modelBuilder.Entity<User>().HasData(
				new User() { Id = 1, UserName = "admin", Password = HashPassword("admin"), RoleId = 1 },
				new User() { Id = 2, UserName = "user",	 Password = HashPassword("user"),  RoleId = 2 },
				new User() { Id = 3, UserName = "moderator", Password = HashPassword("moderator"), RoleId = 3 }
			);
			modelBuilder.Entity<Client>().HasData(
				new Client() { Id = 1, Name = "Vue",	 Url = "http://localhost:8080" },
				new Client() { Id = 2, Name = "Angular", Url = "http://localhost:8081" },
				new Client() { Id = 3, Name = "React",	 Url = "http://localhost:3000" },
				new Client() { Id = 4, Name = "Jquery",	 Url = "http://localhost:8083" }
			);
		}
		string HashPassword(string password)
		{
			return Convert.ToBase64String(new SHA256Managed().ComputeHash(Encoding.UTF8.GetBytes(password)));
		}
	}
}