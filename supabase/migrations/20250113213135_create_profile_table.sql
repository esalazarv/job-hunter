-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null unique,
  name text,
  last_name text,
  second_last_name text,
  phone_country_code text,
  phone_dial_code text,
  phone_number text,
  country_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable RLS
alter table public.profiles enable row level security;
-- Create policies
create policy "Public profiles are viewable by everyone" on profiles for
select using (true);
create policy "Users can insert their own profile" on profiles for
insert with check (auth.uid() = id);
create policy "Users can update their own profile" on profiles for
update using (auth.uid() = id);
-- Create indexes
create index if not exists profiles_email_idx on public.profiles (email);
create index if not exists profiles_name_idx on public.profiles (name);
create index if not exists profiles_last_name_idx on public.profiles (last_name);
-- Set up Realtime
alter publication supabase_realtime
add table profiles;
-- Function to handle user creation
create or replace function public.handle_new_user() returns trigger as $$ begin
insert into public.profiles (id, email)
values (new.id, new.email);
return new;
end;
$$ language plpgsql security definer;
-- Trigger after user creation
create or replace trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();