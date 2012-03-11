require 'test_helper'

class SControllerTest < ActionController::TestCase
  test "should get StaticPages" do
    get :StaticPages
    assert_response :success
  end

  test "should get home" do
    get :home
    assert_response :success
  end

end
