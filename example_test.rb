require 'minitest/autorun'
require_relative 'example'

class StatsTest < MiniTest::Unit::TestCase

  def test_returns_a_count_of_letters_in_the_string
    assert_equal "{:a=>2, :o=>2, :b=>2, :z=>1, :r=>1, :f=>1}", Stats.letter_count("foo bar baz").to_s
    assert_equal "{:i=>12, :t=>10, :e=>8, :c=>7, :r=>6, :u=>6, :l=>5, :n=>5, :a=>5, :s=>5, :o=>5, :d=>4, :m=>4, :b=>2, :g=>2, :p=>2, :f=>2}",
    Stats.letter_count('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt arcu eget lacus blandit efficitur').to_s
  end

end
