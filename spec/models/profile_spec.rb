require 'spec_helper'

describe Profile do
  let(:user) { FactoryGirl.create(:user) }
  before { @profile = user.profile.build(linkid: "", picurl:"", name:"", title:"",
                           location:"", linkurl:"",xp:0,credits:0,awards:0,links:0)}


  subject { @profile }

  it { should respond_to(:linkid) }
  it { should respond_to(:user_id) }
  it { should respond_to(:picurl) }
  it { should respond_to(:name) }
  it { should respond_to(:title) }
  it { should respond_to(:location) }
  it { should respond_to(:linkurl) }
  it { should respond_to(:xp) }
  it { should respond_to(:credits) }
  it { should respond_to(:awards) }
  it { should respond_to(:links) }

  it { should be_valid}

  describe "when user_id is not present" do 
     before {@profile.user_id = nil}
     it { should_not be_valid }
  end
end
