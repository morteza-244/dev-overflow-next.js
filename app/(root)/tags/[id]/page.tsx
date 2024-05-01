interface TagsDetailProps {
  params: {
    id: string;
  };
}

const TagsDetail = ({ params }: TagsDetailProps) => {
  const { id } = params;
  return <div>TagsDetail: {id}</div>;
};

export default TagsDetail;
