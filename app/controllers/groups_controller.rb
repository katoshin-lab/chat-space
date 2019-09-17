class GroupsController < ApplicationController

  def new
  end

  def create
    @group = Group.create(group_params)
  end

  def edit
  end

  def update
    @group = Group.update(group_params)
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end

end
