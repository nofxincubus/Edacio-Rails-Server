require 'spec_helper'

describe "StaticPages" do
  let(:base_title) { "Edacio" }
  
  describe "Home page" do

    it "should have the h1 'Edacio'" do
      visit '/static_pages/home'
      page.should have_selector('h1', :text => 'Edacio')
    end

    it "should have the title 'Edacio'" do
      visit '/static_pages/home'
      page.should have_selector('title', :text => "#{base_title} | Home")
    end
  end

  describe "Help page" do

    it "should have the h1 'Help'" do
      visit '/static_pages/help'
      page.should have_selector('h1', :text => 'Help')
    end

    it "should have the title 'Help'" do
      visit '/static_pages/help'
      page.should have_selector('title', :text => "#{base_title} | Help")
    end
  end

  describe "About page" do

    it "should have the h1 'About Us'" do
      visit '/static_pages/about'
      page.should have_selector('h1', :text => 'About Us')
    end

    it "should have the title 'About'" do
      visit '/static_pages/about'
      page.should have_selector('title', :text => "#{base_title} | About Us")
    end
  end

  describe "Signup page" do

    it "should have the h1 'Signup'" do
      visit '/static_pages/signup'
      page.should have_selector('h1', :text => 'Signup')
    end

    it "should have the title 'Signup'" do
      visit '/static_pages/signup'
      page.should have_selector('title', :text => "#{base_title} | Signup")
    end
  end
end
