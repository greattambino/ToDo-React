class Api::TodosController < ApplicationController
  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo.id
    else
      render json: {error: "ERROR!"}
    end
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end


  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    render json: {completed: "completed"}
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.title =
    @todo.update(todo_params)
    render json: @todo
  end


  private

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end
