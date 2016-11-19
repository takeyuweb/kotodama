require 'test_helper'

class EchosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get echos_index_url
    assert_response :success
  end

end
