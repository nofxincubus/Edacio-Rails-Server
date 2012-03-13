FactoryGirl.define do
  factory :user do
    username     "Michael Hartl"
    email    "michael@example.com"
    password "foobar"
    password_confirmation "foobar"
  end

  factory :profile do
    linkid ""
    picurl ""
    name "Name"
    title ""
    location ""
    linkurl ""
    xp ""
    credits ""
    awards ""
    links ""
    user
  end
end
